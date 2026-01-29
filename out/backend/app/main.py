from fastapi import FastAPI, HTTPException, Depends, Request, BackgroundTasks, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import aiosqlite
import os
import secrets
import hashlib
import json
from dotenv import load_dotenv
import httpx
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

app = FastAPI(title="G3TI Access Control Platform")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
JWT_SECRET = os.getenv("JWT_SECRET", secrets.token_hex(32))
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24
ADMIN_USERNAME = "g3tiadmin"
ADMIN_PASSWORD = os.getenv("G3TI_ADMIN_PASS", "G3TI-Admin-2026!")
SMTP_HOST = os.getenv("SMTP_HOST", "email-smtp.us-east-1.amazonaws.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "AKIATD52R6SQ3DV6ENEY")
SMTP_PASS = os.getenv("SMTP_PASS", "BHUuYfq9TI8ym2d31ip8rZNBtJ8w17697VXeRuDROsrb")
ADMIN_EMAIL = "info@global3technology.com"
BACKUP_ADMIN_EMAIL = "security@global3technology.com"
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

# Admin Override Configuration
ADMIN_OVERRIDE_CODE = os.getenv("ADMIN_OVERRIDE_CODE", "Test123!")
ADMIN_OVERRIDE_ENABLED = os.getenv("ADMIN_OVERRIDE_ENABLED", "true").lower() == "true"

# Password hashing - use sha256_crypt as fallback for bcrypt compatibility issues
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)

# Database path
DB_PATH = "/tmp/g3ti_auth.db"

# Government domain whitelist
GOV_DOMAINS = [
    ".gov", ".mil", ".us", ".fbi.gov", ".dhs.gov", ".cia.gov", ".nsa.gov",
    ".secretservice.gov", ".state.gov", ".usa.gov", ".treasury.gov",
    ".justice.gov", ".police.gov", ".sheriff.gov", ".corrections.gov",
    ".agency.gov", ".homeland.gov"
]

# High-risk domains
HIGH_RISK_DOMAINS = [".xyz", ".click", ".ru", ".cn", ".tk", ".ml", ".ga", ".cf"]

# Free email providers
FREE_EMAIL_PROVIDERS = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
    "aol.com", "protonmail.com", "mail.com", "zoho.com", "yandex.com"
]

# Pydantic Models
class UserRegister(BaseModel):
    email: str
    password: str
    name: str
    agency: Optional[str] = None
    reason: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class VerifyCode(BaseModel):
    email: str
    code: str

class AdminLogin(BaseModel):
    username: str
    password: str

class ApprovalAction(BaseModel):
    user_id: int
    action: str

class DomainWhitelistAdd(BaseModel):
    domain: str

# Classified Access Request Models
class ClassifiedAccessRequest(BaseModel):
    full_name: str
    email: str
    agency: str
    clearance_level: str
    purpose: str
    supervisor_name: str
    supervisor_email: str

class ClassifiedRequestStatusUpdate(BaseModel):
    status: str  # pending, approved, denied, info_requested
    reviewer_notes: Optional[str] = None

class ClassifiedRequestNotesUpdate(BaseModel):
    reviewer_notes: str

# Article Models for News & Intelligence CMS
class ArticleCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    category: str
    content: str
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = []
    featured_image: Optional[str] = None
    publish_date: Optional[str] = None
    status: str = "draft"

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    publish_date: Optional[str] = None
    status: Optional[str] = None

# Database initialization
async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                agency TEXT,
                reason TEXT,
                domain TEXT,
                domain_type TEXT,
                risk_score INTEGER DEFAULT 50,
                status TEXT DEFAULT 'pending',
                ip_address TEXT,
                user_agent TEXT,
                geolocation TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                approved_at TIMESTAMP,
                approved_by TEXT,
                last_login TIMESTAMP,
                login_attempts INTEGER DEFAULT 0,
                locked_until TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS verification_codes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                code TEXT NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                used INTEGER DEFAULT 0
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token TEXT UNIQUE NOT NULL,
                ip_address TEXT,
                user_agent TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action TEXT NOT NULL,
                user_id INTEGER,
                user_email TEXT,
                admin_user TEXT,
                ip_address TEXT,
                details TEXT,
                risk_score INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS domain_whitelist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                domain TEXT UNIQUE NOT NULL,
                added_by TEXT,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Classified Access Requests table for security vetting workflow
        await db.execute("""
            CREATE TABLE IF NOT EXISTS classified_access_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                reference_id TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                agency TEXT NOT NULL,
                clearance_level TEXT NOT NULL,
                purpose TEXT NOT NULL,
                supervisor_name TEXT NOT NULL,
                supervisor_email TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                reviewer_notes TEXT,
                risk_score INTEGER DEFAULT 50,
                ip_address TEXT,
                user_agent TEXT,
                geolocation TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                reviewed_at TIMESTAMP,
                reviewed_by TEXT
            )
        """)
        # Articles table for News & Intelligence CMS
        await db.execute("""
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                subtitle TEXT,
                category TEXT NOT NULL,
                content TEXT NOT NULL,
                excerpt TEXT,
                tags TEXT,
                featured_image TEXT,
                author TEXT DEFAULT 'G3TI Threat Intelligence',
                publish_date TEXT,
                status TEXT DEFAULT 'draft',
                created_by TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP,
                updated_by TEXT
            )
        """)
        for domain in GOV_DOMAINS:
            try:
                await db.execute(
                    "INSERT OR IGNORE INTO domain_whitelist (domain, added_by) VALUES (?, ?)",
                    (domain, "system")
                )
            except:
                pass
        await db.commit()

@app.on_event("startup")
async def startup():
    await init_db()

# Helper functions
def get_domain_from_email(email: str) -> str:
    return email.split("@")[-1].lower()

async def is_domain_whitelisted(domain: str) -> bool:
    for gov_domain in GOV_DOMAINS:
        if domain.endswith(gov_domain.lstrip(".")):
            return True
    return False

def calculate_risk_score(domain: str, ip_address: str = None) -> tuple:
    score = 50
    domain_type = "unknown"
    
    for gov_domain in GOV_DOMAINS:
        if domain.endswith(gov_domain.lstrip(".")):
            score = 10
            domain_type = "government"
            return score, domain_type
    
    if domain in FREE_EMAIL_PROVIDERS:
        score = 70
        domain_type = "free_provider"
    
    for risk_domain in HIGH_RISK_DOMAINS:
        if domain.endswith(risk_domain.lstrip(".")):
            score = 95
            domain_type = "high_risk"
            return score, domain_type
    
    if domain_type == "unknown":
        if "." in domain and domain not in FREE_EMAIL_PROVIDERS:
            score = 40
            domain_type = "corporate"
    
    return score, domain_type

async def get_geolocation(ip_address: str) -> dict:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"http://ip-api.com/json/{ip_address}", timeout=5.0)
            if response.status_code == 200:
                data = response.json()
                return {
                    "city": data.get("city", "Unknown"),
                    "region": data.get("regionName", "Unknown"),
                    "country": data.get("country", "Unknown"),
                    "isp": data.get("isp", "Unknown")
                }
    except:
        pass
    return {"city": "Unknown", "region": "Unknown", "country": "Unknown", "isp": "Unknown"}

async def log_action(action: str, user_id: int = None, user_email: str = None, 
                     admin_user: str = None, ip_address: str = None, 
                     details: str = None, risk_score: int = None):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            INSERT INTO audit_logs (action, user_id, user_email, admin_user, ip_address, details, risk_score)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (action, user_id, user_email, admin_user, ip_address, details, risk_score))
        await db.commit()

def create_jwt_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=JWT_EXPIRATION_HOURS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        return None

async def send_email(to_email: str, subject: str, html_content: str):
    if not SMTP_HOST or not SMTP_USER or not SMTP_PASS:
        print(f"[EMAIL SIMULATION] To: {to_email}, Subject: {subject}")
        return True
    
    try:
        message = MIMEMultipart("alternative")
        message["From"] = ADMIN_EMAIL  # Use verified email address for AWS SES
        message["To"] = to_email
        message["Subject"] = subject
        message.attach(MIMEText(html_content, "html"))
        
        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASS,
            start_tls=True
        )
        return True
    except Exception as e:
        print(f"Email send error: {e}")
        return False

async def send_admin_approval_email(user_data: dict):
    approve_link = f"{BACKEND_URL}/api/admin/quick-approve/{user_data['id']}?token={create_jwt_token({'action': 'approve', 'user_id': user_data['id']}, timedelta(days=7))}"
    deny_link = f"{BACKEND_URL}/api/admin/quick-deny/{user_data['id']}?token={create_jwt_token({'action': 'deny', 'user_id': user_data['id']}, timedelta(days=7))}"
    dashboard_link = f"{BACKEND_URL}/admin/approvals.html"
    
    risk_color = "#22c55e" if user_data['risk_score'] < 40 else "#eab308" if user_data['risk_score'] < 70 else "#ef4444"
    
    html_content = f"""
    <html>
    <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #0A0A0C; border: 2px solid #12F6C8; border-radius: 12px; padding: 30px;">
            <h1 style="color: #12F6C8; text-align: center;">G3TI ACCESS REQUEST</h1>
            <h2 style="color: #EF4444;">APPROVAL NEEDED</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data['name']}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data['email']}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Domain:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data['domain']}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Risk Score:</td><td style="padding: 8px; border-bottom: 1px solid #333;"><span style="background: {risk_color}; color: #000; padding: 4px 12px; border-radius: 4px; font-weight: bold;">{user_data['risk_score']}/100</span></td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Agency:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data.get('agency', 'Not provided')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">IP Address:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data.get('ip_address', 'Unknown')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #9CA3AF;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #fff;">{user_data.get('geolocation', 'Unknown')}</td></tr>
            </table>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{approve_link}" style="display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin: 5px;">APPROVE USER</a>
                <a href="{deny_link}" style="display: inline-block; background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin: 5px;">DENY USER</a>
                <a href="{dashboard_link}" style="display: inline-block; background: linear-gradient(135deg, #0B85E5, #12F6C8); color: #000; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; margin: 5px;">OPEN DASHBOARD</a>
            </div>
        </div>
    </body>
    </html>
    """
    
    await send_email(ADMIN_EMAIL, f"G3TI Access Request - Approval Needed - {user_data['email']}", html_content)
    await send_email(BACKUP_ADMIN_EMAIL, f"G3TI Access Request - Approval Needed - {user_data['email']}", html_content)

async def send_user_status_email(email: str, name: str, approved: bool):
    if approved:
        subject = "G3TI Access Approved"
        html_content = f"""
        <html>
        <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #0A0A0C; border: 2px solid #22c55e; border-radius: 12px; padding: 30px;">
                <h1 style="color: #22c55e; text-align: center;">ACCESS APPROVED</h1>
                <p>Dear {name},</p>
                <p>Your G3TI access request has been approved. You now have full access to restricted intelligence content.</p>
            </div>
        </body>
        </html>
        """
    else:
        subject = "G3TI Access Request - Status Update"
        html_content = f"""
        <html>
        <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #0A0A0C; border: 2px solid #EF4444; border-radius: 12px; padding: 30px;">
                <h1 style="color: #EF4444; text-align: center;">ACCESS REQUEST UPDATE</h1>
                <p>Dear {name},</p>
                <p>Your request for G3TI access cannot be approved at this time.</p>
            </div>
        </body>
        </html>
        """
    
    await send_email(email, subject, html_content)

# API Endpoints
@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/api/auth/register")
async def register(user: UserRegister, request: Request, background_tasks: BackgroundTasks):
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    domain = get_domain_from_email(user.email)
    risk_score, domain_type = calculate_risk_score(domain, ip_address)
    geolocation = await get_geolocation(ip_address)
    geo_str = f"{geolocation['city']}, {geolocation['region']}, {geolocation['country']}"
    
    is_whitelisted = await is_domain_whitelisted(domain)
    status = "approved" if is_whitelisted else "pending"
    
    if risk_score >= 80:
        status = "pending"
        risk_score = max(risk_score, 80)
    
    password_hash = pwd_context.hash(user.password)
    
    try:
        async with aiosqlite.connect(DB_PATH) as db:
            cursor = await db.execute("""
                INSERT INTO users (email, password_hash, name, agency, reason, domain, domain_type, 
                                   risk_score, status, ip_address, user_agent, geolocation)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (user.email, password_hash, user.name, user.agency, user.reason, domain, 
                  domain_type, risk_score, status, ip_address, user_agent, geo_str))
            user_id = cursor.lastrowid
            
            if status == "approved":
                await db.execute("UPDATE users SET approved_at = ? WHERE id = ?", 
                               (datetime.utcnow().isoformat(), user_id))
            
            await db.commit()
            
            await log_action("user_registered", user_id=user_id, user_email=user.email,
                           ip_address=ip_address, details=f"Domain: {domain}, Status: {status}",
                           risk_score=risk_score)
            
            if status == "pending":
                user_data = {
                    "id": user_id, "email": user.email, "name": user.name,
                    "domain": domain, "domain_type": domain_type, "risk_score": risk_score,
                    "agency": user.agency, "reason": user.reason, "ip_address": ip_address,
                    "geolocation": geo_str, "user_agent": user_agent
                }
                background_tasks.add_task(send_admin_approval_email, user_data)
                
                return {"success": True, "status": "pending",
                        "message": "Your access request is pending approval by Global 3 Technology & Intelligence.",
                        "risk_score": risk_score}
            else:
                return {"success": True, "status": "approved",
                        "message": "Automatic Federal/Gov Approval Granted. You can now log in.",
                        "risk_score": risk_score}
                
    except aiosqlite.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")

@app.post("/api/auth/login")
async def login(user: UserLogin, request: Request):
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE email = ?", (user.email,))
        db_user = await cursor.fetchone()
        
        if not db_user:
            await log_action("login_failed", user_email=user.email, ip_address=ip_address, details="User not found")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        db_user = dict(db_user)
        
        if db_user.get("locked_until"):
            locked_until = datetime.fromisoformat(db_user["locked_until"])
            if datetime.utcnow() < locked_until:
                raise HTTPException(status_code=423, detail="Account temporarily locked. Try again later.")
        
        if not pwd_context.verify(user.password, db_user["password_hash"]):
            attempts = db_user.get("login_attempts", 0) + 1
            locked_until = None
            
            if attempts >= 5:
                locked_until = (datetime.utcnow() + timedelta(minutes=10)).isoformat()
                await log_action("account_locked", user_id=db_user["id"], user_email=user.email,
                               ip_address=ip_address, details="Too many failed login attempts")
            
            await db.execute("UPDATE users SET login_attempts = ?, locked_until = ? WHERE id = ?",
                           (attempts, locked_until, db_user["id"]))
            await db.commit()
            
            if attempts >= 5:
                raise HTTPException(status_code=423, detail="Account locked due to too many failed attempts.")
            
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        if db_user["status"] == "pending":
            raise HTTPException(status_code=403, detail="Your access request is pending approval.")
        
        if db_user["status"] == "denied":
            raise HTTPException(status_code=403, detail="Your access request was denied.")
        
        await db.execute("UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = ?", (db_user["id"],))
        await db.commit()
        
        verification_code = secrets.token_hex(3).upper()
        expires_at = (datetime.utcnow() + timedelta(minutes=10)).isoformat()
        
        await db.execute("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)",
                        (user.email, verification_code, expires_at))
        await db.commit()
        
        html_content = f"""
        <html>
        <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #0A0A0C; border: 2px solid #12F6C8; border-radius: 12px; padding: 30px;">
                <h1 style="color: #12F6C8; text-align: center;">VERIFICATION CODE</h1>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; letter-spacing: 8px; background: #1a1a1a; padding: 15px 30px; border-radius: 8px; color: #12F6C8;">{verification_code}</span>
                </div>
                <p>This code expires in 10 minutes.</p>
            </div>
        </body>
        </html>
        """
        await send_email(user.email, "G3TI Verification Code", html_content)
        
        await log_action("login_step1_success", user_id=db_user["id"], user_email=user.email,
                        ip_address=ip_address, details="Verification code sent")
        
        return {"success": True, "message": "Verification code sent to your email", "requires_verification": True}

@app.post("/api/auth/verify")
async def verify_code(data: VerifyCode, request: Request):
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        cursor = await db.execute("""
            SELECT * FROM verification_codes 
            WHERE email = ? AND code = ? AND used = 0 AND expires_at > ?
            ORDER BY id DESC LIMIT 1
        """, (data.email, data.code.upper(), datetime.utcnow().isoformat()))
        code_record = await cursor.fetchone()
        
        if not code_record:
            await log_action("verification_failed", user_email=data.email, ip_address=ip_address, details="Invalid code")
            raise HTTPException(status_code=401, detail="Invalid or expired verification code")
        
        await db.execute("UPDATE verification_codes SET used = 1 WHERE id = ?", (code_record["id"],))
        
        cursor = await db.execute("SELECT * FROM users WHERE email = ?", (data.email,))
        db_user = await cursor.fetchone()
        db_user = dict(db_user)
        
        await db.execute("UPDATE users SET last_login = ? WHERE id = ?", (datetime.utcnow().isoformat(), db_user["id"]))
        
        token = create_jwt_token({"user_id": db_user["id"], "email": db_user["email"], "status": db_user["status"]})
        
        expires_at = (datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)).isoformat()
        await db.execute("INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)",
                        (db_user["id"], token, ip_address, user_agent, expires_at))
        
        await db.commit()
        
        await log_action("login_success", user_id=db_user["id"], user_email=data.email, ip_address=ip_address)
        
        return {"success": True, "token": token, "user": {"id": db_user["id"], "email": db_user["email"], "name": db_user["name"], "status": db_user["status"]}}

@app.get("/api/auth/check")
async def check_auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return {"authenticated": False, "has_access": False, "admin_override": False}
    
    payload = verify_jwt_token(credentials.credentials)
    if not payload:
        return {"authenticated": False, "has_access": False, "admin_override": False}
    
    # Check if this is an admin override token
    if payload.get("admin_override"):
        return {
            "authenticated": True, 
            "has_access": True, 
            "admin_override": True,
            "user": {"id": 0, "email": "admin@override", "name": "Admin Override", "status": "approved"}
        }
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (payload.get("user_id"),))
        user = await cursor.fetchone()
        
        if not user:
            return {"authenticated": False, "has_access": False, "admin_override": False}
        
        user = dict(user)
        return {"authenticated": True, "has_access": user["status"] == "approved", "admin_override": False,
                "user": {"id": user["id"], "email": user["email"], "name": user["name"], "status": user["status"]}}

@app.post("/api/auth/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials:
        async with aiosqlite.connect(DB_PATH) as db:
            await db.execute("DELETE FROM sessions WHERE token = ?", (credentials.credentials,))
            await db.commit()
    return {"success": True}

# Admin endpoints
@app.post("/api/admin/login")
async def admin_login(data: AdminLogin, request: Request):
    ip_address = request.client.host if request.client else "unknown"
    
    if data.username != ADMIN_USERNAME or data.password != ADMIN_PASSWORD:
        await log_action("admin_login_failed", ip_address=ip_address, details=f"Username: {data.username}")
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    
    token = create_jwt_token({"admin": True, "username": ADMIN_USERNAME}, timedelta(hours=8))
    
    await log_action("admin_login_success", admin_user=ADMIN_USERNAME, ip_address=ip_address)
    
    return {"success": True, "token": token}

async def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    payload = verify_jwt_token(credentials.credentials)
    if not payload or not payload.get("admin"):
        raise HTTPException(status_code=401, detail="Invalid admin token")
    
    return payload

@app.get("/api/admin/pending")
async def get_pending_users(admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT id, email, name, agency, reason, domain, domain_type, risk_score, 
                   status, ip_address, geolocation, user_agent, created_at
            FROM users WHERE status = 'pending' ORDER BY created_at DESC
        """)
        users = await cursor.fetchall()
        return {"users": [dict(u) for u in users]}

@app.get("/api/admin/approved")
async def get_approved_users(admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT id, email, name, agency, domain, domain_type, risk_score, 
                   status, approved_at, approved_by, last_login, created_at
            FROM users WHERE status = 'approved' ORDER BY approved_at DESC
        """)
        users = await cursor.fetchall()
        return {"users": [dict(u) for u in users]}

@app.get("/api/admin/denied")
async def get_denied_users(admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT id, email, name, agency, domain, domain_type, risk_score, status, created_at
            FROM users WHERE status = 'denied' ORDER BY created_at DESC
        """)
        users = await cursor.fetchall()
        return {"users": [dict(u) for u in users]}

@app.post("/api/admin/approve/{user_id}")
async def approve_user(user_id: int, request: Request, background_tasks: BackgroundTasks, admin = Depends(verify_admin)):
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = await cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = dict(user)
        
        await db.execute("UPDATE users SET status = 'approved', approved_at = ?, approved_by = ? WHERE id = ?",
                        (datetime.utcnow().isoformat(), admin.get("username"), user_id))
        await db.commit()
        
        await log_action("user_approved", user_id=user_id, user_email=user["email"],
                        admin_user=admin.get("username"), ip_address=ip_address)
        
        background_tasks.add_task(send_user_status_email, user["email"], user["name"], True)
        
        return {"success": True, "message": f"User {user['email']} approved"}

@app.post("/api/admin/deny/{user_id}")
async def deny_user(user_id: int, request: Request, background_tasks: BackgroundTasks, admin = Depends(verify_admin)):
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = await cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = dict(user)
        
        await db.execute("UPDATE users SET status = 'denied' WHERE id = ?", (user_id,))
        await db.commit()
        
        await log_action("user_denied", user_id=user_id, user_email=user["email"],
                        admin_user=admin.get("username"), ip_address=ip_address)
        
        background_tasks.add_task(send_user_status_email, user["email"], user["name"], False)
        
        return {"success": True, "message": f"User {user['email']} denied"}

@app.get("/api/admin/quick-approve/{user_id}")
async def quick_approve(user_id: int, token: str, request: Request, background_tasks: BackgroundTasks):
    payload = verify_jwt_token(token)
    if not payload or payload.get("action") != "approve" or payload.get("user_id") != user_id:
        return HTMLResponse(content="<html><body style='background:#050505;color:#EF4444;font-family:monospace;text-align:center;padding:50px;'><h1>Invalid or Expired Link</h1></body></html>", status_code=400)
    
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = await cursor.fetchone()
        
        if not user:
            return HTMLResponse(content="<html><body>User not found</body></html>", status_code=404)
        
        user = dict(user)
        
        await db.execute("UPDATE users SET status = 'approved', approved_at = ?, approved_by = ? WHERE id = ?",
                        (datetime.utcnow().isoformat(), "email_link", user_id))
        await db.commit()
        
        await log_action("user_approved", user_id=user_id, user_email=user["email"], admin_user="email_link", ip_address=ip_address)
        
        background_tasks.add_task(send_user_status_email, user["email"], user["name"], True)
        
        return HTMLResponse(content=f"<html><body style='background:#050505;color:#22c55e;font-family:monospace;text-align:center;padding:50px;'><h1>USER APPROVED</h1><p>{user['email']} has been granted access.</p></body></html>")

@app.get("/api/admin/quick-deny/{user_id}")
async def quick_deny(user_id: int, token: str, request: Request, background_tasks: BackgroundTasks):
    payload = verify_jwt_token(token)
    if not payload or payload.get("action") != "deny" or payload.get("user_id") != user_id:
        return HTMLResponse(content="<html><body style='background:#050505;color:#EF4444;font-family:monospace;text-align:center;padding:50px;'><h1>Invalid or Expired Link</h1></body></html>", status_code=400)
    
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = await cursor.fetchone()
        
        if not user:
            return HTMLResponse(content="<html><body>User not found</body></html>", status_code=404)
        
        user = dict(user)
        
        await db.execute("UPDATE users SET status = 'denied' WHERE id = ?", (user_id,))
        await db.commit()
        
        await log_action("user_denied", user_id=user_id, user_email=user["email"], admin_user="email_link", ip_address=ip_address)
        
        background_tasks.add_task(send_user_status_email, user["email"], user["name"], False)
        
        return HTMLResponse(content=f"<html><body style='background:#050505;color:#EF4444;font-family:monospace;text-align:center;padding:50px;'><h1>USER DENIED</h1><p>{user['email']} has been denied access.</p></body></html>")

@app.get("/api/admin/logs")
async def get_audit_logs(admin = Depends(verify_admin), limit: int = 100):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?", (limit,))
        logs = await cursor.fetchall()
        return {"logs": [dict(l) for l in logs]}

@app.get("/api/admin/user/{user_id}")
async def get_user_detail(user_id: int, admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = await cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        cursor = await db.execute("SELECT * FROM audit_logs WHERE user_id = ? OR user_email = ? ORDER BY created_at DESC LIMIT 50",
                                 (user_id, user["email"]))
        logs = await cursor.fetchall()
        
        return {"user": dict(user), "logs": [dict(l) for l in logs]}

@app.get("/api/admin/whitelist")
async def get_whitelist(admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM domain_whitelist ORDER BY domain")
        domains = await cursor.fetchall()
        return {"domains": [dict(d) for d in domains]}

@app.post("/api/admin/whitelist")
async def add_to_whitelist(data: DomainWhitelistAdd, admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute("INSERT INTO domain_whitelist (domain, added_by) VALUES (?, ?)",
                           (data.domain.lower(), admin.get("username")))
            await db.commit()
            await log_action("whitelist_add", admin_user=admin.get("username"), details=f"Added domain: {data.domain}")
            return {"success": True, "message": f"Domain {data.domain} added to whitelist"}
        except aiosqlite.IntegrityError:
            raise HTTPException(status_code=400, detail="Domain already in whitelist")

@app.delete("/api/admin/whitelist/{domain}")
async def remove_from_whitelist(domain: str, admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("DELETE FROM domain_whitelist WHERE domain = ?", (domain.lower(),))
        await db.commit()
        await log_action("whitelist_remove", admin_user=admin.get("username"), details=f"Removed domain: {domain}")
        return {"success": True, "message": f"Domain {domain} removed from whitelist"}

@app.get("/api/admin/stats")
async def get_stats(admin = Depends(verify_admin)):
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT COUNT(*) FROM users WHERE status = 'pending'")
        pending = (await cursor.fetchone())[0]
        
        cursor = await db.execute("SELECT COUNT(*) FROM users WHERE status = 'approved'")
        approved = (await cursor.fetchone())[0]
        
        cursor = await db.execute("SELECT COUNT(*) FROM users WHERE status = 'denied'")
        denied = (await cursor.fetchone())[0]
        
        cursor = await db.execute("SELECT COUNT(*) FROM users")
        total = (await cursor.fetchone())[0]
        
        cursor = await db.execute("SELECT COUNT(*) FROM users WHERE created_at > datetime('now', '-24 hours')")
        last_24h = (await cursor.fetchone())[0]
        
        cursor = await db.execute("SELECT AVG(risk_score) FROM users")
        avg_risk = (await cursor.fetchone())[0] or 0
        
        return {"pending": pending, "approved": approved, "denied": denied, "total": total, "last_24h": last_24h, "avg_risk_score": round(avg_risk, 1)}

@app.post("/api/evaluate-domain")
async def evaluate_domain(email: str = Form(...)):
    domain = get_domain_from_email(email)
    risk_score, domain_type = calculate_risk_score(domain)
    is_whitelisted = await is_domain_whitelisted(domain)
    
    return {"domain": domain, "domain_type": domain_type, "risk_score": risk_score, "is_whitelisted": is_whitelisted, "auto_approve": is_whitelisted and risk_score < 80}

# Admin Override Endpoint
class AdminOverrideRequest(BaseModel):
    agency: str

@app.post("/api/auth/admin-override")
async def admin_override_login(data: AdminOverrideRequest, request: Request):
    """Admin override login - bypasses all authentication when correct code is provided in agency field"""
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    # Check if admin override is enabled
    if not ADMIN_OVERRIDE_ENABLED:
        await log_action("admin_override_attempt_disabled", ip_address=ip_address, details="Override feature disabled")
        raise HTTPException(status_code=403, detail="Admin override is not enabled")
    
    # Check if the agency field contains the override code
    if data.agency != ADMIN_OVERRIDE_CODE:
        await log_action("admin_override_attempt_failed", ip_address=ip_address, details=f"Invalid code attempted")
        raise HTTPException(status_code=401, detail="Invalid override code")
    
    # Create admin override token with short expiration (1 hour)
    token = create_jwt_token({
        "admin_override": True,
        "ip": ip_address,
        "granted_at": datetime.utcnow().isoformat()
    }, timedelta(hours=1))
    
    # Log successful admin override
    await log_action("ADMIN OVERRIDE LOGIN", ip_address=ip_address, 
                     details=f"Admin override access granted. User-Agent: {user_agent}")
    
    return {
        "success": True, 
        "token": token, 
        "admin_override": True,
        "message": "Admin override access granted",
        "user": {"id": 0, "email": "admin@override", "name": "Admin Override", "status": "approved"}
    }

# Contact Form / Transmission Form Endpoint
# Rate limiting storage (in-memory for simplicity, resets on restart)
rate_limit_store: dict = {}
RATE_LIMIT_MAX = 5  # Max submissions per IP
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds

class TransmissionRequest(BaseModel):
    name: str
    email: str
    organization: Optional[str] = None
    classification: str
    subject: str
    message: str

def sanitize_input(text: str) -> str:
    """Sanitize input to prevent XSS and injection attacks"""
    if not text:
        return ""
    # HTML escape special characters
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    text = text.replace('"', "&quot;")
    text = text.replace("'", "&#x27;")
    # Remove any null bytes
    text = text.replace("\x00", "")
    # Limit length
    return text[:10000]

def generate_reference_id() -> str:
    """Generate unique reference ID: G3TI-YYYYMMDD-XXXXX"""
    date_part = datetime.utcnow().strftime("%Y%m%d")
    random_part = secrets.token_hex(3).upper()[:5]
    return f"G3TI-{date_part}-{random_part}"

async def check_rate_limit(ip_address: str) -> bool:
    """Check if IP has exceeded rate limit. Returns True if allowed, False if blocked."""
    current_time = datetime.utcnow().timestamp()
    
    if ip_address not in rate_limit_store:
        rate_limit_store[ip_address] = []
    
    # Clean old entries
    rate_limit_store[ip_address] = [
        t for t in rate_limit_store[ip_address] 
        if current_time - t < RATE_LIMIT_WINDOW
    ]
    
    if len(rate_limit_store[ip_address]) >= RATE_LIMIT_MAX:
        return False
    
    rate_limit_store[ip_address].append(current_time)
    return True

async def log_transmission(email: str, classification: str, reference_id: str, ip_address: str):
    """Log transmission metadata only - no message content, no PII beyond email"""
    timestamp = datetime.utcnow().isoformat()
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            INSERT INTO audit_logs (action, user_email, ip_address, details, risk_score)
            VALUES (?, ?, ?, ?, ?)
        """, ("TRANSMISSION_RECEIVED", email, ip_address, f"ref={reference_id},classification={classification}", 0))
        await db.commit()
    print(f"[TRANSMISSION LOG] {timestamp} | {reference_id} | {email} | {classification} | {ip_address}")

async def send_transmission_to_admin(data: TransmissionRequest, reference_id: str, timestamp: str, ip_address: str, user_agent: str):
    """Send transmission to admin email only (info@global3technology.com)"""
    # Sanitize all inputs for email
    safe_name = sanitize_input(data.name)
    safe_email = sanitize_input(data.email)
    safe_org = sanitize_input(data.organization or "Not provided")
    safe_subject = sanitize_input(data.subject)
    safe_message = sanitize_input(data.message)
    safe_classification = sanitize_input(data.classification)
    safe_ip = sanitize_input(ip_address)
    safe_ua = sanitize_input(user_agent)
    
    html_content = f"""
    <html>
    <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
        <div style="max-width: 700px; margin: 0 auto; background: #0A0A0C; border: 2px solid #12F6C8; border-radius: 12px; padding: 30px;">
            <h1 style="color: #12F6C8; text-align: center;">NEW ENCRYPTED TRANSMISSION RECEIVED</h1>
            <h2 style="color: #EF4444; text-align: center;">Classification: {safe_classification.upper()}</h2>
            
            <div style="background: #111; border: 1px solid #12F6C8; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="color: #12F6C8; margin: 0; font-size: 14px;">Reference ID: <strong>{reference_id}</strong></p>
                <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 12px;">Timestamp: {timestamp}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF; width: 140px;">Agent Name:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{safe_name}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #12F6C8;">{safe_email}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Organization:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{safe_org}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Classification:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #EF4444; font-weight: bold;">{safe_classification.upper()}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Subject:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{safe_subject}</td></tr>
            </table>
            
            <div style="background: #111; border: 1px solid #333; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h3 style="color: #12F6C8; margin-top: 0;">Message Body:</h3>
                <p style="color: #fff; white-space: pre-wrap; line-height: 1.6;">{safe_message}</p>
            </div>
            
            <div style="background: #0D0D0F; border: 1px solid #333; border-radius: 8px; padding: 15px; margin-top: 20px;">
                <h4 style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 12px;">SECURITY LOGGING</h4>
                <p style="color: #666; font-size: 11px; margin: 5px 0;">IP Address: {safe_ip}</p>
                <p style="color: #666; font-size: 11px; margin: 5px 0; word-break: break-all;">User-Agent: {safe_ua}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center; border-top: 1px solid #333; padding-top: 15px;">
                Received via G3TI Secure Intelligence Channel v3.1
            </p>
        </div>
    </body>
    </html>
    """
    # Send ONLY to info@global3technology.com - no other addresses
    await send_email(ADMIN_EMAIL, f"New Encrypted Transmission Received – {safe_classification.upper()}", html_content)

async def send_auto_reply(email: str, name: str, reference_id: str):
    """Send auto-reply confirmation to sender"""
    safe_name = sanitize_input(name)
    html_content = f"""
    <html>
    <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #0A0A0C; border: 2px solid #12F6C8; border-radius: 12px; padding: 30px;">
            <h1 style="color: #12F6C8; text-align: center;">G3TI TRANSMISSION RECEIVED</h1>
            
            <div style="background: #111; border: 1px solid #12F6C8; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
                <p style="color: #9CA3AF; margin: 0; font-size: 12px;">Your Reference ID:</p>
                <p style="color: #12F6C8; margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">{reference_id}</p>
            </div>
            
            <p style="color: #D1D5DB; line-height: 1.8;">
                Dear {safe_name},
            </p>
            
            <p style="color: #D1D5DB; line-height: 1.8;">
                Your transmission has been securely received by Global 3 Technology &amp; Intelligence (G3TI).
            </p>
            
            <p style="color: #D1D5DB; line-height: 1.8;">
                Our Intelligence Operations team will review your message and respond based on your classification level.
            </p>
            
            <p style="color: #D1D5DB; line-height: 1.8;">
                If your inquiry relates to a grant, research partnership, or federal funding opportunity, a member of our Strategic Programs Division will contact you directly.
            </p>
            
            <p style="color: #D1D5DB; line-height: 1.8;">
                Thank you for contacting G3TI — Autonomous Protective Intelligence for the AI Threat Era.
            </p>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
                This is an automated confirmation. Please do not reply to this email.<br>
                Reference ID: {reference_id}
            </p>
        </div>
    </body>
    </html>
    """
    await send_email(email, f"G3TI Transmission Received - {reference_id}", html_content)

@app.post("/api/contact/submit")
async def submit_transmission(data: TransmissionRequest, background_tasks: BackgroundTasks, request: Request):
    """Handle transmission form submission with security measures"""
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    
    # Rate limiting check
    if not await check_rate_limit(ip_address):
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Please wait before submitting again."
        )
    
    # Basic input validation
    if not data.name or not data.email or not data.message:
        raise HTTPException(status_code=400, detail="Required fields missing")
    
    if len(data.email) > 254 or "@" not in data.email:
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Generate reference ID
    reference_id = generate_reference_id()
    
    # Log transmission metadata
    await log_transmission(data.email, data.classification, reference_id, ip_address)
    
    # Send to admin email (info@global3technology.com only)
    background_tasks.add_task(send_transmission_to_admin, data, reference_id, timestamp, ip_address, user_agent)
    
    # Send auto-reply confirmation to sender
    background_tasks.add_task(send_auto_reply, data.email, data.name, reference_id)
    
    return {
        "success": True,
        "reference_id": reference_id,
        "message": "TRANSMISSION SECURED — Your encrypted message has been delivered to G3TI Headquarters."
    }

# ============================================================================
# CLASSIFIED ACCESS REQUEST SYSTEM
# Security Vetting Workflow with Admin Dashboard
# ============================================================================

def calculate_classified_risk_score(email: str, clearance_level: str, agency: str) -> int:
    """Calculate risk score for classified access requests"""
    score = 50  # Base score
    
    # Email domain analysis
    domain = email.split("@")[-1].lower() if "@" in email else ""
    
    # Government domains get lower risk
    for gov_domain in GOV_DOMAINS:
        if domain.endswith(gov_domain.lstrip(".")):
            score -= 30
            break
    
    # Free email providers get higher risk
    if domain in FREE_EMAIL_PROVIDERS:
        score += 25
    
    # High-risk domains
    for risk_domain in HIGH_RISK_DOMAINS:
        if domain.endswith(risk_domain.lstrip(".")):
            score += 40
            break
    
    # Clearance level adjustments
    clearance_scores = {
        "ts-sci": -10,
        "top-secret": -5,
        "secret": 0,
        "confidential": 5,
        "not-sure": 20
    }
    score += clearance_scores.get(clearance_level, 10)
    
    # Clamp score between 0 and 100
    return max(0, min(100, score))

async def send_classified_request_notification(request_data: dict, reference_id: str):
    """Send notification email to admin about new classified access request"""
    risk_color = "#22c55e" if request_data['risk_score'] < 40 else "#eab308" if request_data['risk_score'] < 70 else "#ef4444"
    
    html_content = f"""
    <html>
    <body style="font-family: 'Courier New', monospace; background: #050505; color: #D1D5DB; padding: 20px;">
        <div style="max-width: 700px; margin: 0 auto; background: #0A0A0C; border: 2px solid #dc2626; border-radius: 12px; padding: 30px;">
            <h1 style="color: #dc2626; text-align: center;">CLASSIFIED ACCESS REQUEST</h1>
            <h2 style="color: #f59e0b; text-align: center;">Security Review Required</h2>
            
            <div style="background: #111; border: 1px solid #dc2626; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="color: #dc2626; margin: 0; font-size: 14px;">Reference ID: <strong>{reference_id}</strong></p>
                <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 12px;">Submitted: {request_data['created_at']}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF; width: 160px;">Full Name:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{sanitize_input(request_data['full_name'])}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #12F6C8;">{sanitize_input(request_data['email'])}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Agency:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{sanitize_input(request_data['agency'])}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Clearance Level:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #f59e0b; font-weight: bold;">{sanitize_input(request_data['clearance_level']).upper()}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Risk Score:</td><td style="padding: 10px; border-bottom: 1px solid #333;"><span style="background: {risk_color}; color: #000; padding: 4px 12px; border-radius: 4px; font-weight: bold;">{request_data['risk_score']}/100</span></td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">Supervisor:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">{sanitize_input(request_data['supervisor_name'])} ({sanitize_input(request_data['supervisor_email'])})</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #333; color: #9CA3AF;">IP Address:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #666;">{request_data.get('ip_address', 'Unknown')}</td></tr>
            </table>
            
            <div style="background: #111; border: 1px solid #333; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h3 style="color: #12F6C8; margin-top: 0;">Purpose of Request:</h3>
                <p style="color: #fff; white-space: pre-wrap; line-height: 1.6;">{sanitize_input(request_data['purpose'])}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center; border-top: 1px solid #333; padding-top: 15px;">
                Review this request at: /admin/access-logs.html
            </p>
        </div>
    </body>
    </html>
    """
    await send_email(ADMIN_EMAIL, f"CLASSIFIED ACCESS REQUEST - {reference_id} - {request_data['clearance_level'].upper()}", html_content)
    await send_email(BACKUP_ADMIN_EMAIL, f"CLASSIFIED ACCESS REQUEST - {reference_id} - {request_data['clearance_level'].upper()}", html_content)

@app.post("/api/classified/submit")
async def submit_classified_request(data: ClassifiedAccessRequest, background_tasks: BackgroundTasks, request: Request):
    """Submit a new classified access request"""
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    # Rate limiting
    if not await check_rate_limit(ip_address):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please wait before submitting again.")
    
    # Validate required fields
    if not data.full_name or not data.email or not data.agency:
        raise HTTPException(status_code=400, detail="Required fields missing")
    
    if len(data.email) > 254 or "@" not in data.email:
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Generate reference ID
    reference_id = f"G3TI-CLS-{datetime.utcnow().strftime('%Y%m%d')}-{secrets.token_hex(3).upper()}"
    
    # Calculate risk score
    risk_score = calculate_classified_risk_score(data.email, data.clearance_level, data.agency)
    
    # Get geolocation
    geolocation = await get_geolocation(ip_address)
    geo_str = f"{geolocation['city']}, {geolocation['region']}, {geolocation['country']}"
    
    # Store in database
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            INSERT INTO classified_access_requests 
            (reference_id, full_name, email, agency, clearance_level, purpose, 
             supervisor_name, supervisor_email, risk_score, ip_address, user_agent, geolocation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (reference_id, sanitize_input(data.full_name), data.email, sanitize_input(data.agency),
              data.clearance_level, sanitize_input(data.purpose), sanitize_input(data.supervisor_name),
              data.supervisor_email, risk_score, ip_address, user_agent, geo_str))
        await db.commit()
    
    # Log the action
    await log_action(
        action="CLASSIFIED_REQUEST_SUBMITTED",
        user_email=data.email,
        ip_address=ip_address,
        details=f"reference_id={reference_id},clearance={data.clearance_level},agency={data.agency}",
        risk_score=risk_score
    )
    
    # Send notification to admin
    request_data = {
        "full_name": data.full_name,
        "email": data.email,
        "agency": data.agency,
        "clearance_level": data.clearance_level,
        "purpose": data.purpose,
        "supervisor_name": data.supervisor_name,
        "supervisor_email": data.supervisor_email,
        "risk_score": risk_score,
        "ip_address": ip_address,
        "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    }
    background_tasks.add_task(send_classified_request_notification, request_data, reference_id)
    
    return {
        "success": True,
        "reference_id": reference_id,
        "message": "Your classified access request has been received by G3TI Security Division."
    }

# Access Logs API Endpoints
@app.get("/api/access-logs")
async def get_access_logs(
    status: Optional[str] = None,
    clearance: Optional[str] = None,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all classified access requests (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        query = "SELECT * FROM classified_access_requests"
        conditions = []
        params = []
        
        if status:
            conditions.append("status = ?")
            params.append(status)
        if clearance:
            conditions.append("clearance_level = ?")
            params.append(clearance)
        
        if conditions:
            query += " WHERE " + " AND ".join(conditions)
        query += " ORDER BY created_at DESC"
        
        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]

@app.get("/api/admin/classified-requests")
async def get_classified_requests(
    status: Optional[str] = None,
    clearance: Optional[str] = None,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all classified access requests (admin only) - alias endpoint"""
    return await get_access_logs(status, clearance, credentials)

@app.get("/api/admin/classified-requests/stats")
async def get_classified_requests_stats(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get dashboard statistics for classified requests"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        # Total count
        cursor = await db.execute("SELECT COUNT(*) FROM classified_access_requests")
        total = (await cursor.fetchone())[0]
        
        # By status
        cursor = await db.execute("SELECT status, COUNT(*) FROM classified_access_requests GROUP BY status")
        status_counts = {row[0]: row[1] for row in await cursor.fetchall()}
        
        # By clearance level
        cursor = await db.execute("SELECT clearance_level, COUNT(*) FROM classified_access_requests GROUP BY clearance_level")
        clearance_counts = {row[0]: row[1] for row in await cursor.fetchall()}
        
        # Average risk score
        cursor = await db.execute("SELECT AVG(risk_score) FROM classified_access_requests")
        avg_risk = (await cursor.fetchone())[0] or 0
        
        # High risk count (score >= 70)
        cursor = await db.execute("SELECT COUNT(*) FROM classified_access_requests WHERE risk_score >= 70")
        high_risk = (await cursor.fetchone())[0]
        
        # Recent 7 days
        cursor = await db.execute("SELECT COUNT(*) FROM classified_access_requests WHERE created_at >= datetime('now', '-7 days')")
        recent_7_days = (await cursor.fetchone())[0]
        
        return {
            "total": total,
            "by_status": status_counts,
            "by_clearance": clearance_counts,
            "average_risk_score": round(avg_risk, 1),
            "high_risk_count": high_risk,
            "recent_7_days": recent_7_days
        }

@app.get("/api/admin/classified-requests/{request_id}")
async def get_classified_request_detail(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get details of a single classified request"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM classified_access_requests WHERE id = ?", (request_id,))
        row = await cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Request not found")
        return dict(row)

@app.post("/api/access/approve")
async def approve_classified_request(
    request_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Approve a classified access request"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT * FROM classified_access_requests WHERE id = ?", (request_id,))
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Request not found")
        
        await db.execute("""
            UPDATE classified_access_requests 
            SET status = 'approved', reviewed_at = ?, reviewed_by = ?
            WHERE id = ?
        """, (datetime.utcnow().isoformat(), "admin", request_id))
        await db.commit()
        
        await log_action(action="CLASSIFIED_REQUEST_APPROVED", admin_user="admin", details=f"request_id={request_id}")
        
        return {"success": True, "message": "Request approved"}

@app.post("/api/access/deny")
async def deny_classified_request(
    request_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Deny a classified access request"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT * FROM classified_access_requests WHERE id = ?", (request_id,))
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Request not found")
        
        await db.execute("""
            UPDATE classified_access_requests 
            SET status = 'denied', reviewed_at = ?, reviewed_by = ?
            WHERE id = ?
        """, (datetime.utcnow().isoformat(), "admin", request_id))
        await db.commit()
        
        await log_action(action="CLASSIFIED_REQUEST_DENIED", admin_user="admin", details=f"request_id={request_id}")
        
        return {"success": True, "message": "Request denied"}

@app.put("/api/admin/classified-requests/{request_id}/status")
async def update_classified_request_status(
    request_id: int,
    update: ClassifiedRequestStatusUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Update status of a classified request (approve/deny/request info)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    valid_statuses = ["pending", "approved", "denied", "info_requested"]
    if update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT * FROM classified_access_requests WHERE id = ?", (request_id,))
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Request not found")
        
        await db.execute("""
            UPDATE classified_access_requests 
            SET status = ?, reviewer_notes = COALESCE(?, reviewer_notes), reviewed_at = ?, reviewed_by = ?
            WHERE id = ?
        """, (update.status, update.reviewer_notes, datetime.utcnow().isoformat(), "admin", request_id))
        await db.commit()
        
        await log_action(
            action=f"CLASSIFIED_REQUEST_{update.status.upper()}",
            admin_user="admin",
            details=f"request_id={request_id},notes={update.reviewer_notes or 'None'}"
        )
        
        return {"success": True, "message": f"Request status updated to {update.status}"}

@app.put("/api/admin/classified-requests/{request_id}/notes")
async def update_classified_request_notes(
    request_id: int,
    update: ClassifiedRequestNotesUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Add or update reviewer notes for a classified request"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT id FROM classified_access_requests WHERE id = ?", (request_id,))
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Request not found")
        
        await db.execute("""
            UPDATE classified_access_requests 
            SET reviewer_notes = ?, reviewed_at = ?, reviewed_by = ?
            WHERE id = ?
        """, (update.reviewer_notes, datetime.utcnow().isoformat(), "admin", request_id))
        await db.commit()
        
        return {"success": True, "message": "Notes updated successfully"}

@app.get("/api/admin/classified-requests/export/csv")
async def export_classified_requests_csv(
    status: Optional[str] = None,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Export classified requests as CSV"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        query = "SELECT * FROM classified_access_requests"
        params = []
        if status:
            query += " WHERE status = ?"
            params.append(status)
        query += " ORDER BY created_at DESC"
        
        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()
        
        headers = ["ID", "Reference ID", "Full Name", "Email", "Agency", "Clearance Level", 
                   "Purpose", "Supervisor Name", "Supervisor Email", "Status", "Risk Score",
                   "Reviewer Notes", "IP Address", "Created At", "Reviewed At", "Reviewed By"]
        
        csv_lines = [",".join(headers)]
        for row in rows:
            row_dict = dict(row)
            values = [
                str(row_dict.get('id', '')),
                str(row_dict.get('reference_id', '')),
                f'"{sanitize_input(row_dict.get("full_name", ""))}"',
                str(row_dict.get('email', '')),
                f'"{sanitize_input(row_dict.get("agency", ""))}"',
                str(row_dict.get('clearance_level', '')),
                f'"{sanitize_input(row_dict.get("purpose", ""))[:100]}..."',
                f'"{sanitize_input(row_dict.get("supervisor_name", ""))}"',
                str(row_dict.get('supervisor_email', '')),
                str(row_dict.get('status', '')),
                str(row_dict.get('risk_score', '')),
                f'"{sanitize_input(row_dict.get("reviewer_notes", "") or "")}"',
                str(row_dict.get('ip_address', '')),
                str(row_dict.get('created_at', '')),
                str(row_dict.get('reviewed_at', '') or ''),
                str(row_dict.get('reviewed_by', '') or '')
            ]
            csv_lines.append(",".join(values))
        
        csv_content = "\n".join(csv_lines)
        
        return JSONResponse(
            content={"csv": csv_content, "filename": f"classified_requests_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"},
            headers={"Content-Type": "application/json"}
        )

@app.get("/api/admin/classified-requests/export/json")
async def export_classified_requests_json(
    status: Optional[str] = None,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Export classified requests as JSON (for PDF generation on frontend)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        query = "SELECT * FROM classified_access_requests"
        params = []
        if status:
            query += " WHERE status = ?"
            params.append(status)
        query += " ORDER BY created_at DESC"
        
        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()
        
        return {
            "requests": [dict(row) for row in rows],
            "exported_at": datetime.utcnow().isoformat(),
            "total_count": len(rows)
        }

# ============================================================================
# NEWS & INTELLIGENCE CMS - ARTICLE MANAGEMENT
# Admin-only article creation, editing, and publishing
# ============================================================================

# Category to image mapping for auto-assignment
CATEGORY_IMAGE_MAP = {
    "Government": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=675&fit=crop",
    "Enterprise": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop",
    "AI Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
    "National Threats": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop",
    "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop"
}

def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from title"""
    import re
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = re.sub(r'^-|-$', '', slug)
    return slug

async def backup_articles_to_json():
    """Backup all articles to /data/articles.json"""
    try:
        async with aiosqlite.connect(DB_PATH) as db:
            db.row_factory = aiosqlite.Row
            cursor = await db.execute("SELECT * FROM articles WHERE status = 'published' ORDER BY publish_date DESC")
            rows = await cursor.fetchall()
            
            articles = []
            for row in rows:
                row_dict = dict(row)
                tags = row_dict.get('tags', '')
                if tags:
                    row_dict['tags'] = tags.split(',') if isinstance(tags, str) else tags
                else:
                    row_dict['tags'] = []
                articles.append(row_dict)
            
            backup_data = {
                "articles": articles,
                "categories": list(CATEGORY_IMAGE_MAP.keys()),
                "categoryImageMap": CATEGORY_IMAGE_MAP,
                "lastUpdated": datetime.utcnow().isoformat()
            }
            
            # Write to backup file
            backup_path = "/tmp/articles_backup.json"
            with open(backup_path, 'w') as f:
                json.dump(backup_data, f, indent=2)
            
            return True
    except Exception as e:
        print(f"Backup error: {e}")
        return False

@app.get("/api/articles")
async def get_articles(
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50
):
    """Get all articles (public endpoint for published, admin for all)"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        query = "SELECT * FROM articles WHERE 1=1"
        params = []
        
        # Default to published only for public access
        if status:
            query += " AND status = ?"
            params.append(status)
        else:
            query += " AND status = 'published'"
        
        if category:
            query += " AND category = ?"
            params.append(category)
        
        if search:
            query += " AND (title LIKE ? OR content LIKE ?)"
            params.extend([f"%{search}%", f"%{search}%"])
        
        query += " ORDER BY publish_date DESC, created_at DESC LIMIT ?"
        params.append(limit)
        
        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()
        
        articles = []
        for row in rows:
            row_dict = dict(row)
            tags = row_dict.get('tags', '')
            if tags:
                row_dict['tags'] = tags.split(',') if isinstance(tags, str) else tags
            else:
                row_dict['tags'] = []
            articles.append(row_dict)
        
        return {"articles": articles, "total": len(articles)}

@app.get("/api/articles/{article_id}")
async def get_article(article_id: int):
    """Get single article by ID"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM articles WHERE id = ?", (article_id,))
        row = await cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Article not found")
        
        row_dict = dict(row)
        tags = row_dict.get('tags', '')
        if tags:
            row_dict['tags'] = tags.split(',') if isinstance(tags, str) else tags
        else:
            row_dict['tags'] = []
        
        return row_dict

@app.get("/api/articles/slug/{slug}")
async def get_article_by_slug(slug: str):
    """Get single article by slug"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM articles WHERE slug = ? AND status = 'published'", (slug,))
        row = await cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Article not found")
        
        row_dict = dict(row)
        tags = row_dict.get('tags', '')
        if tags:
            row_dict['tags'] = tags.split(',') if isinstance(tags, str) else tags
        else:
            row_dict['tags'] = []
        
        return row_dict

@app.post("/api/admin/articles")
async def create_article(
    article: ArticleCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create new article (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    ip_address = request.client.host if request.client else "unknown"
    
    # Sanitize inputs
    title = sanitize_input(article.title)
    subtitle = sanitize_input(article.subtitle) if article.subtitle else None
    content = sanitize_input(article.content)
    category = sanitize_input(article.category)
    
    # Generate slug
    slug = generate_slug(title)
    
    # Auto-generate excerpt if not provided
    excerpt = article.excerpt
    if not excerpt:
        excerpt = content[:200] + "..." if len(content) > 200 else content
    excerpt = sanitize_input(excerpt)
    
    # Auto-assign image if not provided
    featured_image = article.featured_image
    if not featured_image:
        featured_image = CATEGORY_IMAGE_MAP.get(category, CATEGORY_IMAGE_MAP["Technology"])
    
    # Process tags
    tags_str = ",".join(article.tags) if article.tags else ""
    
    # Set publish date
    publish_date = article.publish_date or datetime.utcnow().strftime("%Y-%m-%d")
    
    async with aiosqlite.connect(DB_PATH) as db:
        # Check for duplicate slug
        cursor = await db.execute("SELECT id FROM articles WHERE slug = ?", (slug,))
        if await cursor.fetchone():
            # Append timestamp to make unique
            slug = f"{slug}-{int(datetime.utcnow().timestamp())}"
        
        await db.execute("""
            INSERT INTO articles (slug, title, subtitle, category, content, excerpt, tags, featured_image, publish_date, status, created_by, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (slug, title, subtitle, category, content, excerpt, tags_str, featured_image, publish_date, article.status, "admin", datetime.utcnow().isoformat()))
        await db.commit()
        
        cursor = await db.execute("SELECT last_insert_rowid()")
        article_id = (await cursor.fetchone())[0]
        
        # Log action
        await log_action(
            action="ARTICLE_CREATED",
            admin_user="admin",
            ip_address=ip_address,
            details=f"article_id={article_id},title={title},status={article.status}"
        )
        
        # Backup to JSON if published
        if article.status == "published":
            background_tasks.add_task(backup_articles_to_json)
        
        return {
            "success": True,
            "article_id": article_id,
            "slug": slug,
            "message": f"Article {'published' if article.status == 'published' else 'saved as draft'} successfully"
        }

@app.put("/api/admin/articles/{article_id}")
async def update_article(
    article_id: int,
    article: ArticleUpdate,
    request: Request,
    background_tasks: BackgroundTasks,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Update existing article (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM articles WHERE id = ?", (article_id,))
        existing = await cursor.fetchone()
        
        if not existing:
            raise HTTPException(status_code=404, detail="Article not found")
        
        existing_dict = dict(existing)
        
        # Build update query dynamically
        updates = []
        params = []
        
        if article.title is not None:
            updates.append("title = ?")
            params.append(sanitize_input(article.title))
            # Update slug if title changed
            updates.append("slug = ?")
            params.append(generate_slug(article.title))
        
        if article.subtitle is not None:
            updates.append("subtitle = ?")
            params.append(sanitize_input(article.subtitle))
        
        if article.category is not None:
            updates.append("category = ?")
            params.append(sanitize_input(article.category))
        
        if article.content is not None:
            updates.append("content = ?")
            params.append(sanitize_input(article.content))
            # Update excerpt if content changed and no custom excerpt
            if article.excerpt is None:
                updates.append("excerpt = ?")
                params.append(sanitize_input(article.content[:200] + "..."))
        
        if article.excerpt is not None:
            updates.append("excerpt = ?")
            params.append(sanitize_input(article.excerpt))
        
        if article.tags is not None:
            updates.append("tags = ?")
            params.append(",".join(article.tags))
        
        if article.featured_image is not None:
            updates.append("featured_image = ?")
            params.append(article.featured_image)
        
        if article.publish_date is not None:
            updates.append("publish_date = ?")
            params.append(article.publish_date)
        
        if article.status is not None:
            updates.append("status = ?")
            params.append(article.status)
        
        updates.append("updated_at = ?")
        params.append(datetime.utcnow().isoformat())
        updates.append("updated_by = ?")
        params.append("admin")
        
        params.append(article_id)
        
        query = f"UPDATE articles SET {', '.join(updates)} WHERE id = ?"
        await db.execute(query, params)
        await db.commit()
        
        # Log action
        await log_action(
            action="ARTICLE_UPDATED",
            admin_user="admin",
            ip_address=ip_address,
            details=f"article_id={article_id},fields_updated={len(updates)-2}"
        )
        
        # Backup to JSON
        background_tasks.add_task(backup_articles_to_json)
        
        return {"success": True, "message": "Article updated successfully"}

@app.delete("/api/admin/articles/{article_id}")
async def delete_article(
    article_id: int,
    request: Request,
    background_tasks: BackgroundTasks,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Delete article (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    ip_address = request.client.host if request.client else "unknown"
    
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT title FROM articles WHERE id = ?", (article_id,))
        row = await cursor.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail="Article not found")
        
        title = row[0]
        
        await db.execute("DELETE FROM articles WHERE id = ?", (article_id,))
        await db.commit()
        
        # Log action
        await log_action(
            action="ARTICLE_DELETED",
            admin_user="admin",
            ip_address=ip_address,
            details=f"article_id={article_id},title={title}"
        )
        
        # Backup to JSON
        background_tasks.add_task(backup_articles_to_json)
        
        return {"success": True, "message": "Article deleted successfully"}

@app.get("/api/admin/articles")
async def get_all_articles_admin(
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get all articles including drafts (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        
        query = "SELECT * FROM articles WHERE 1=1"
        params = []
        
        if status:
            query += " AND status = ?"
            params.append(status)
        
        if category:
            query += " AND category = ?"
            params.append(category)
        
        if search:
            query += " AND (title LIKE ? OR content LIKE ?)"
            params.extend([f"%{search}%", f"%{search}%"])
        
        query += " ORDER BY created_at DESC"
        
        cursor = await db.execute(query, params)
        rows = await cursor.fetchall()
        
        articles = []
        for row in rows:
            row_dict = dict(row)
            tags = row_dict.get('tags', '')
            if tags:
                row_dict['tags'] = tags.split(',') if isinstance(tags, str) else tags
            else:
                row_dict['tags'] = []
            articles.append(row_dict)
        
        return {"articles": articles, "total": len(articles)}

@app.get("/api/admin/articles/stats")
async def get_articles_stats(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get article statistics (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        # Total articles
        cursor = await db.execute("SELECT COUNT(*) FROM articles")
        total = (await cursor.fetchone())[0]
        
        # Published
        cursor = await db.execute("SELECT COUNT(*) FROM articles WHERE status = 'published'")
        published = (await cursor.fetchone())[0]
        
        # Drafts
        cursor = await db.execute("SELECT COUNT(*) FROM articles WHERE status = 'draft'")
        drafts = (await cursor.fetchone())[0]
        
        # By category
        cursor = await db.execute("SELECT category, COUNT(*) FROM articles GROUP BY category")
        by_category = {row[0]: row[1] for row in await cursor.fetchall()}
        
        return {
            "total": total,
            "published": published,
            "drafts": drafts,
            "by_category": by_category
        }

@app.post("/api/admin/articles/sync-json")
async def sync_articles_from_json(
    background_tasks: BackgroundTasks,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Sync articles from existing JSON file to database (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    try:
        # Read existing articles.json
        json_path = "/home/ubuntu/repos/g3ti-website1/out/data/articles.json"
        if not os.path.exists(json_path):
            raise HTTPException(status_code=404, detail="articles.json not found")
        
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        articles = data.get('articles', [])
        synced = 0
        
        async with aiosqlite.connect(DB_PATH) as db:
            for article in articles:
                slug = article.get('slug', generate_slug(article.get('title', '')))
                
                # Check if already exists
                cursor = await db.execute("SELECT id FROM articles WHERE slug = ?", (slug,))
                if await cursor.fetchone():
                    continue
                
                tags_str = ",".join(article.get('tags', [])) if isinstance(article.get('tags'), list) else article.get('tags', '')
                
                await db.execute("""
                    INSERT INTO articles (slug, title, subtitle, category, content, excerpt, tags, featured_image, publish_date, status, created_by, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    slug,
                    article.get('title', ''),
                    article.get('subtitle'),
                    article.get('category', 'Technology'),
                    article.get('content', ''),
                    article.get('excerpt', ''),
                    tags_str,
                    article.get('featuredImage') or article.get('featured_image'),
                    article.get('publishDate') or article.get('publish_date'),
                    article.get('status', 'published'),
                    'system_sync',
                    datetime.utcnow().isoformat()
                ))
                synced += 1
            
            await db.commit()
        
        return {"success": True, "synced": synced, "message": f"Synced {synced} articles from JSON"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sync failed: {str(e)}")

@app.get("/api/admin/verify")
async def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify if the provided token is valid admin token"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Invalid or expired admin token")
    return {"valid": True, "message": "Admin token is valid"}

# ============================================================================
# TRUSTED PERSONNEL ACCESS KEY SYSTEM
# Secure key-based access for verified personnel without full login
# ============================================================================

# Access Keys Configuration (loaded from config or environment)
ACCESS_KEYS = {
    "G3TI-TRUSTED-ACCESS-ALDRIC": {
        "owner": "Dr. Aldric Marshall",
        "permissions": ["all"],
        "expires": None,  # Never expires
        "created_at": "2026-01-16T00:00:00Z"
    }
}

# Access Key Session Settings
ACCESS_KEY_SESSION_HOURS = 24
ACCESS_KEY_MAX_FAILED_ATTEMPTS = 5
ACCESS_KEY_LOCKOUT_MINUTES = 30

# Track failed attempts (in-memory, resets on restart)
access_key_failed_attempts = {}

class AccessKeyValidate(BaseModel):
    key: str
    target_page: Optional[str] = None

class AccessKeySession(BaseModel):
    session_token: str

@app.post("/api/access-key/validate")
async def validate_access_key(data: AccessKeyValidate, request: Request):
    """Validate a trusted personnel access key and create session"""
    ip_address = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    key = data.key.strip()
    target_page = data.target_page or "/"
    
    # Check for lockout
    if ip_address in access_key_failed_attempts:
        attempts, lockout_until = access_key_failed_attempts[ip_address]
        if lockout_until and datetime.utcnow() < lockout_until:
            remaining = (lockout_until - datetime.utcnow()).seconds // 60
            await log_action(
                action="ACCESS_KEY_LOCKOUT",
                ip_address=ip_address,
                details=f"IP locked out, {remaining} minutes remaining"
            )
            raise HTTPException(
                status_code=429, 
                detail=f"Too many failed attempts. Try again in {remaining} minutes."
            )
    
    # Validate key
    if key in ACCESS_KEYS:
        key_data = ACCESS_KEYS[key]
        
        # Check expiration
        if key_data.get("expires"):
            try:
                expires_at = datetime.fromisoformat(key_data["expires"].replace("Z", "+00:00"))
                if datetime.utcnow() > expires_at.replace(tzinfo=None):
                    await log_action(
                        action="ACCESS_KEY_EXPIRED",
                        ip_address=ip_address,
                        details=f"key_owner={key_data['owner']},target={target_page}"
                    )
                    raise HTTPException(status_code=401, detail="Access key has expired.")
            except ValueError:
                pass  # Invalid date format, treat as never expires
        
        # Create session token
        session_token = create_jwt_token({
            "type": "access_key",
            "owner": key_data["owner"],
            "permissions": key_data["permissions"],
            "ip": ip_address
        }, timedelta(hours=ACCESS_KEY_SESSION_HOURS))
        
        # Clear failed attempts
        if ip_address in access_key_failed_attempts:
            del access_key_failed_attempts[ip_address]
        
        # Log successful access
        await log_action(
            action="ACCESS_KEY_SUCCESS",
            ip_address=ip_address,
            details=f"key_owner={key_data['owner']},target={target_page},user_agent={user_agent[:100]}"
        )
        
        return {
            "valid": True,
            "owner": key_data["owner"],
            "permissions": key_data["permissions"],
            "session_token": session_token,
            "expires_in_hours": ACCESS_KEY_SESSION_HOURS,
            "message": f"Trusted Access Granted - Welcome, {key_data['owner']}."
        }
    else:
        # Track failed attempt
        if ip_address not in access_key_failed_attempts:
            access_key_failed_attempts[ip_address] = [0, None]
        
        access_key_failed_attempts[ip_address][0] += 1
        attempts = access_key_failed_attempts[ip_address][0]
        
        # Check if should lockout
        if attempts >= ACCESS_KEY_MAX_FAILED_ATTEMPTS:
            lockout_until = datetime.utcnow() + timedelta(minutes=ACCESS_KEY_LOCKOUT_MINUTES)
            access_key_failed_attempts[ip_address][1] = lockout_until
            
            await log_action(
                action="ACCESS_KEY_LOCKOUT_TRIGGERED",
                ip_address=ip_address,
                details=f"attempts={attempts},lockout_minutes={ACCESS_KEY_LOCKOUT_MINUTES}"
            )
        
        # Log failed attempt
        await log_action(
            action="ACCESS_KEY_FAILED",
            ip_address=ip_address,
            details=f"invalid_key_attempt,target={target_page},attempts={attempts}"
        )
        
        raise HTTPException(status_code=401, detail="Invalid or expired access key.")

@app.post("/api/access-key/verify")
async def verify_access_key_session(data: AccessKeySession, request: Request):
    """Verify an existing access key session token"""
    ip_address = request.client.host if request.client else "unknown"
    
    payload = verify_jwt_token(data.session_token)
    
    if not payload or payload.get("type") != "access_key":
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    return {
        "valid": True,
        "owner": payload.get("owner"),
        "permissions": payload.get("permissions", []),
        "message": "Session is valid"
    }

@app.get("/api/access-key/audit-logs")
async def get_access_key_audit_logs(
    limit: int = 100,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get audit logs for access key usage (admin only)"""
    if not credentials or not verify_admin(credentials.credentials):
        raise HTTPException(status_code=401, detail="Admin authentication required")
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("""
            SELECT * FROM audit_logs 
            WHERE action LIKE 'ACCESS_KEY_%'
            ORDER BY created_at DESC 
            LIMIT ?
        """, (limit,))
        rows = await cursor.fetchall()
        
        logs = [dict(row) for row in rows]
        return {"logs": logs, "total": len(logs)}
