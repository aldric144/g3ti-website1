from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from contextlib import asynccontextmanager
import os
import json
import asyncio
from datetime import datetime
from openai import AsyncOpenAI
import aiofiles
import random
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# Configuration
STATIC_DIR = os.environ.get("STATIC_DIR", os.path.join(os.path.dirname(os.path.dirname(__file__)), "static"))
OPENAI_API_KEY = os.environ.get("G3TI_Key", os.environ.get("OPENAI_API_KEY", ""))

# Category to image mapping (royalty-free Unsplash images)
CATEGORY_IMAGE_MAP = {
    "Government": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=675&fit=crop",
    "Enterprise": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop",
    "AI Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop",
    "National Threats": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop",
    "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop"
}

CATEGORIES = list(CATEGORY_IMAGE_MAP.keys())

# Brief category colors for styling
BRIEF_CATEGORY_COLORS = {
    "AI Security": {"bg": "rgba(18, 246, 200, 0.1)", "border": "#12F6C8", "color": "#12F6C8"},
    "Government": {"bg": "rgba(11, 133, 229, 0.1)", "border": "#0B85E5", "color": "#0B85E5"},
    "Enterprise": {"bg": "rgba(139, 92, 246, 0.1)", "border": "#8B5CF6", "color": "#8B5CF6"},
    "National Threats": {"bg": "rgba(239, 68, 68, 0.1)", "border": "#EF4444", "color": "#EF4444"},
    "Technology": {"bg": "rgba(34, 197, 94, 0.1)", "border": "#22C55E", "color": "#22C55E"}
}

# Initialize scheduler
scheduler = AsyncIOScheduler()

# OpenAI client (initialized on startup)
openai_client = None

def get_openai_client():
    global openai_client
    if openai_client is None and OPENAI_API_KEY:
        openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)
    return openai_client

async def generate_brief_content(category: str) -> dict:
    """Generate an intelligence brief using GPT-4.1"""
    client = get_openai_client()
    if not client:
        return None
    
    prompt = f"""Generate a cybersecurity intelligence brief for the category: {category}

Requirements:
- Title: A compelling, professional headline (8-12 words)
- Content: 80-120 words describing a current threat, trend, or intelligence update
- The content should be relevant to {category} sector
- Use professional, authoritative language suitable for government/enterprise audiences
- Include specific details like percentages, timeframes, or threat actor names when appropriate
- Do not use markdown formatting

Respond in JSON format:
{{"title": "...", "content": "...", "category": "{category}"}}"""

    try:
        response = await client.chat.completions.create(
            model="gpt-4.1",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500
        )
        content = response.choices[0].message.content.strip()
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        return json.loads(content)
    except Exception as e:
        print(f"Error generating brief: {e}")
        return None

async def generate_article_content(category: str) -> dict:
    """Generate a full article using GPT-4.1"""
    client = get_openai_client()
    if not client:
        return None
    
    prompt = f"""Generate a comprehensive cybersecurity article for the category: {category}

Requirements:
- Title: A compelling, professional headline (8-15 words)
- Subtitle: A brief secondary headline (10-20 words)
- Content: 500-800 words covering a significant topic in {category}
- Structure the content with 3-4 sections (use ## for section headers)
- Include specific data points, statistics, or case studies
- Use professional, authoritative language suitable for government/enterprise audiences
- End with actionable recommendations or a call to action
- Generate 4-6 relevant tags as a comma-separated list

Respond in JSON format:
{{"title": "...", "subtitle": "...", "content": "...", "tags": "tag1, tag2, tag3, tag4", "category": "{category}"}}"""

    try:
        response = await client.chat.completions.create(
            model="gpt-4.1",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=2000
        )
        content = response.choices[0].message.content.strip()
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        return json.loads(content)
    except Exception as e:
        print(f"Error generating article: {e}")
        return None

def generate_slug(title: str) -> str:
    """Generate URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug[:60]

async def load_json_file(filepath: str) -> dict:
    """Load JSON file or return default structure"""
    try:
        async with aiofiles.open(filepath, 'r') as f:
            content = await f.read()
            return json.loads(content)
    except FileNotFoundError:
        return {"briefs": [], "lastUpdated": None} if "briefs" in filepath else {"articles": [], "lastUpdated": None}
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return {"briefs": [], "lastUpdated": None} if "briefs" in filepath else {"articles": [], "lastUpdated": None}

async def save_json_file(filepath: str, data: dict):
    """Save data to JSON file"""
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        async with aiofiles.open(filepath, 'w') as f:
            await f.write(json.dumps(data, indent=2))
    except Exception as e:
        print(f"Error saving {filepath}: {e}")

def generate_article_html(article: dict) -> str:
    """Generate HTML page for an article"""
    category = article.get("category", "Technology")
    colors = BRIEF_CATEGORY_COLORS.get(category, BRIEF_CATEGORY_COLORS["Technology"])
    image_url = CATEGORY_IMAGE_MAP.get(category, CATEGORY_IMAGE_MAP["Technology"])
    
    content = article.get("content", "")
    content_html = ""
    for para in content.split("\n\n"):
        para = para.strip()
        if para.startswith("## "):
            content_html += f'<h2>{para[3:]}</h2>\n'
        elif para:
            content_html += f'<p>{para}</p>\n'
    
    tags_html = ""
    tags = article.get("tags", "").split(",") if isinstance(article.get("tags"), str) else article.get("tags", [])
    for tag in tags:
        tag = tag.strip()
        if tag:
            tags_html += f'<span class="tag">{tag}</span>\n'
    
    return f'''<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>{article.get("title", "Article")} | G3TI News &amp; Intelligence</title>
  <meta name="description" content="{article.get("subtitle", "")}"/>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ background: #050505; color: white; font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; background-image: linear-gradient(rgba(11, 133, 229, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 133, 229, 0.03) 1px, transparent 1px); background-size: 50px 50px; }}
    nav {{ display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: rgba(5, 5, 5, 0.95); border-bottom: 1px solid rgba(11, 133, 229, 0.2); position: sticky; top: 0; z-index: 100; }}
    .logo {{ display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: white; }}
    .logo-box {{ background: linear-gradient(135deg, #0B85E5, #12F6C8); padding: 0.5rem 0.75rem; border-radius: 6px; font-weight: bold; font-size: 1.25rem; }}
    .nav-links {{ display: flex; gap: 2rem; }}
    .nav-links a {{ color: #9CA3AF; text-decoration: none; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.3s; }}
    .nav-links a:hover, .nav-links a.active {{ color: #12F6C8; }}
    main {{ max-width: 900px; margin: 0 auto; padding: 2rem; }}
    .breadcrumb {{ margin-bottom: 2rem; font-size: 0.875rem; }}
    .breadcrumb a {{ color: #0B85E5; text-decoration: none; }}
    .breadcrumb span {{ color: #6B7280; }}
    .article-header {{ margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(11, 133, 229, 0.2); }}
    .article-category {{ display: inline-block; background: {colors["bg"]}; border: 1px solid {colors["border"]}; padding: 0.25rem 0.75rem; border-radius: 4px; font-family: monospace; font-size: 0.7rem; color: {colors["color"]}; margin-bottom: 1rem; }}
    .article-header h1 {{ font-size: 2.5rem; font-weight: bold; margin-bottom: 0.75rem; line-height: 1.2; background: linear-gradient(135deg, #fff, #12F6C8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }}
    .article-header .subtitle {{ color: #0B85E5; font-size: 1.25rem; margin-bottom: 1.5rem; }}
    .article-meta {{ display: flex; gap: 2rem; color: #6B7280; font-size: 0.875rem; }}
    .featured-image {{ width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; border-radius: 12px; margin-bottom: 3rem; }}
    .article-content {{ line-height: 1.8; font-size: 1.1rem; color: #D1D5DB; }}
    .article-content p {{ margin-bottom: 1.5rem; }}
    .article-content h2 {{ color: #12F6C8; font-size: 1.5rem; margin: 2rem 0 1rem; }}
    .tags-section {{ margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(11, 133, 229, 0.2); }}
    .tags-section h4 {{ color: #6B7280; font-size: 0.875rem; margin-bottom: 1rem; }}
    .tags {{ display: flex; flex-wrap: wrap; gap: 0.5rem; }}
    .tag {{ background: #0A0A0C; border: 1px solid rgba(11, 133, 229, 0.3); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; color: #9CA3AF; }}
    .back-link {{ display: inline-block; margin-top: 2rem; padding: 0.75rem 1.5rem; background: rgba(11, 133, 229, 0.2); border: 1px solid #0B85E5; border-radius: 6px; color: #0B85E5; text-decoration: none; font-family: monospace; transition: all 0.3s; }}
    .back-link:hover {{ background: rgba(11, 133, 229, 0.4); color: #12F6C8; border-color: #12F6C8; }}
    footer {{ border-top: 1px solid rgba(11, 133, 229, 0.2); padding: 3rem 2rem; text-align: center; background: rgba(5, 5, 5, 0.95); margin-top: 4rem; }}
    footer p {{ color: #6B7280; font-size: 0.875rem; }}
    @media (max-width: 768px) {{ .nav-links {{ display: none; }} .article-header h1 {{ font-size: 1.75rem; }} main {{ padding: 1rem; }} }}
  </style>
</head>
<body>
  <nav>
    <a href="/" class="logo"><div class="logo-box">G3</div><div><div style="font-weight: 600; font-size: 1rem;">G3TI</div><div style="font-size: 0.75rem; color: #9CA3AF; font-family: monospace;">D.I.E. SYSTEM</div></div></a>
    <div class="nav-links"><a href="/">Home</a><a href="/government.html">Government</a><a href="/enterprise.html">Enterprise</a><a href="/products.html">Products</a><a href="/news-intelligence.html" class="active">News &amp; Intelligence</a><a href="/compliance.html">Compliance</a><a href="/contact.html">Contact</a></div>
  </nav>
  <main>
    <div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/news-intelligence.html">News &amp; Intelligence</a> <span>/</span> <span>{article.get("title", "Article")[:30]}...</span></div>
    <article>
      <header class="article-header">
        <div class="article-category">{category.upper()}</div>
        <h1>{article.get("title", "")}</h1>
        <p class="subtitle">{article.get("subtitle", "")}</p>
        <div class="article-meta"><span>{article.get("publishDate", "")}</span><span>G3TI Threat Intelligence</span><span>{article.get("readTime", "5")} min read</span></div>
      </header>
      <img class="featured-image" src="{image_url}" alt="{article.get("title", "")}"/>
      <div class="article-content">
        {content_html}
      </div>
      <div class="tags-section"><h4>TAGS</h4><div class="tags">{tags_html}</div></div>
      <a href="/news-intelligence.html" class="back-link">&larr; Back to News &amp; Intelligence</a>
    </article>
  </main>
  <footer><p>&copy; 2026 Global 3 Technology &amp; Intelligence. All rights reserved.</p></footer>
</body>
</html>'''

async def publish_briefs(count: int = 5):
    """Generate and publish intelligence briefs"""
    print(f"[{datetime.now()}] Starting brief generation: {count} briefs")
    
    briefs_path = os.path.join(STATIC_DIR, "data", "briefs.json")
    briefs_data = await load_json_file(briefs_path)
    
    if "briefs" not in briefs_data:
        briefs_data["briefs"] = []
    
    categories_to_use = random.sample(CATEGORIES, min(count, len(CATEGORIES)))
    while len(categories_to_use) < count:
        categories_to_use.append(random.choice(CATEGORIES))
    
    new_briefs = []
    for i, category in enumerate(categories_to_use[:count]):
        brief_content = await generate_brief_content(category)
        if brief_content:
            brief = {
                "id": str(len(briefs_data["briefs"]) + i + 1),
                "title": brief_content.get("title", "Intelligence Brief"),
                "content": brief_content.get("content", ""),
                "category": category,
                "publishDate": datetime.now().strftime("%Y-%m-%d"),
                "slug": generate_slug(brief_content.get("title", f"brief-{datetime.now().timestamp()}")),
                "status": "published"
            }
            new_briefs.append(brief)
            print(f"  Generated brief: {brief['title']}")
    
    briefs_data["briefs"] = new_briefs + briefs_data["briefs"]
    briefs_data["lastUpdated"] = datetime.now().isoformat()
    
    await save_json_file(briefs_path, briefs_data)
    print(f"[{datetime.now()}] Published {len(new_briefs)} briefs")
    
    return new_briefs

async def publish_articles(count: int = 3):
    """Generate and publish full articles"""
    print(f"[{datetime.now()}] Starting article generation: {count} articles")
    
    articles_path = os.path.join(STATIC_DIR, "data", "articles.json")
    articles_data = await load_json_file(articles_path)
    
    if "articles" not in articles_data:
        articles_data["articles"] = []
    
    categories_to_use = random.sample(CATEGORIES, min(count, len(CATEGORIES)))
    while len(categories_to_use) < count:
        categories_to_use.append(random.choice(CATEGORIES))
    
    new_articles = []
    for i, category in enumerate(categories_to_use[:count]):
        article_content = await generate_article_content(category)
        if article_content:
            slug = generate_slug(article_content.get("title", f"article-{datetime.now().timestamp()}"))
            
            word_count = len(article_content.get("content", "").split())
            read_time = max(3, word_count // 200)
            
            article = {
                "id": str(len(articles_data["articles"]) + i + 1),
                "slug": slug,
                "title": article_content.get("title", "Article"),
                "subtitle": article_content.get("subtitle", ""),
                "category": category,
                "content": article_content.get("content", ""),
                "excerpt": article_content.get("content", "")[:200] + "...",
                "publishDate": datetime.now().strftime("%Y-%m-%d"),
                "tags": [t.strip() for t in article_content.get("tags", "").split(",")] if isinstance(article_content.get("tags"), str) else article_content.get("tags", []),
                "featuredImage": CATEGORY_IMAGE_MAP.get(category, CATEGORY_IMAGE_MAP["Technology"]),
                "author": "G3TI Threat Intelligence",
                "readTime": str(read_time),
                "status": "published"
            }
            new_articles.append(article)
            
            html_content = generate_article_html(article)
            article_path = os.path.join(STATIC_DIR, "news-intelligence", f"{slug}.html")
            os.makedirs(os.path.dirname(article_path), exist_ok=True)
            async with aiofiles.open(article_path, 'w') as f:
                await f.write(html_content)
            
            print(f"  Generated article: {article['title']}")
    
    articles_data["articles"] = new_articles + articles_data["articles"]
    articles_data["lastUpdated"] = datetime.now().isoformat()
    
    if "categoryImageMap" not in articles_data:
        articles_data["categoryImageMap"] = CATEGORY_IMAGE_MAP
    
    await save_json_file(articles_path, articles_data)
    print(f"[{datetime.now()}] Published {len(new_articles)} articles")
    
    return new_articles

async def scheduled_publish():
    """Scheduled job to publish briefs and articles"""
    print(f"\n{'='*50}")
    print(f"[{datetime.now()}] SCHEDULED PUBLISH JOB STARTED")
    print(f"{'='*50}")
    
    try:
        briefs = await publish_briefs(count=3)
        articles = await publish_articles(count=2)
        
        print(f"[{datetime.now()}] SCHEDULED PUBLISH JOB COMPLETED")
        print(f"  Briefs published: {len(briefs)}")
        print(f"  Articles published: {len(articles)}")
    except Exception as e:
        print(f"[{datetime.now()}] SCHEDULED PUBLISH JOB FAILED: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    print("Starting G3TI Auto-Publisher...")
    print(f"Static directory: {STATIC_DIR}")
    print(f"OpenAI API Key configured: {'Yes' if OPENAI_API_KEY else 'No'}")
    
    scheduler.add_job(
        scheduled_publish,
        CronTrigger(hour="6,18", minute="0"),
        id="scheduled_publish",
        replace_existing=True
    )
    scheduler.start()
    print("Scheduler started - publishing at 6:00 AM and 6:00 PM UTC daily")
    
    yield
    
    scheduler.shutdown()
    print("Scheduler stopped")

app = FastAPI(lifespan=lifespan)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/api/status")
async def status():
    """Get publisher status"""
    return {
        "status": "running",
        "scheduler_running": scheduler.running,
        "next_run": str(scheduler.get_job("scheduled_publish").next_run_time) if scheduler.get_job("scheduled_publish") else None,
        "openai_configured": bool(OPENAI_API_KEY),
        "static_dir": STATIC_DIR
    }

@app.post("/api/publish/briefs")
async def trigger_briefs(count: int = 5):
    """Manually trigger brief generation"""
    briefs = await publish_briefs(count=count)
    return {"status": "success", "count": len(briefs), "briefs": [b["title"] for b in briefs]}

@app.post("/api/publish/articles")
async def trigger_articles(count: int = 3):
    """Manually trigger article generation"""
    articles = await publish_articles(count=count)
    return {"status": "success", "count": len(articles), "articles": [a["title"] for a in articles]}

@app.post("/api/publish/all")
async def trigger_all():
    """Manually trigger full publish cycle"""
    await scheduled_publish()
    return {"status": "success", "message": "Full publish cycle completed"}

@app.get("/api/briefs")
async def get_briefs():
    """Get all briefs"""
    briefs_path = os.path.join(STATIC_DIR, "data", "briefs.json")
    return await load_json_file(briefs_path)

@app.get("/api/articles")
async def get_articles():
    """Get all articles"""
    articles_path = os.path.join(STATIC_DIR, "data", "articles.json")
    return await load_json_file(articles_path)

# Mount static files AFTER API routes
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
