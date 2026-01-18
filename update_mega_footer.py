#!/usr/bin/env python3
"""
Script to update all HTML pages with the mega-footer from about-g3ti.html.
This replaces any existing footer with the exact 6-column mega-footer template.
"""

import os
import re
from pathlib import Path

# Directory containing HTML files
OUT_DIR = Path("/home/ubuntu/repos/g3ti-website1/out")

# The exact mega-footer HTML from about-g3ti.html (lines 178-272)
MEGA_FOOTER_HTML = '''<footer style="background:#050505;border-top:1px solid rgba(18,246,200,0.1);padding:60px 20px 30px;margin-top:80px;">
<div style="max-width:1400px;margin:0 auto;">
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:40px;margin-bottom:40px;" class="g3ti-footer-grid">
<!-- COLUMN 1 — G3TI CORE -->
<div>
<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
<div style="width:40px;height:40px;background:linear-gradient(135deg,#12F6C8,#0B85E5);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;color:black;font-size:1rem;">G3</div>
<span style="color:#12F6C8;font-weight:bold;font-size:1.1rem;">G3TI</span>
</div>
<p style="color:#9ca3af;font-size:0.85rem;line-height:1.6;margin:0 0 8px 0;">GLOBAL 3 TECHNOLOGY & INTELLIGENCE™</p>
<p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Autonomous Protective Intelligence for the AI Threat Era</p>
<p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Veteran-Owned Technology & Intelligence Company</p>
<p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Palm Beach, FL</p>
<p style="color:#12F6C8;font-size:0.75rem;line-height:1.5;margin:0;">Phone: 1-888-603-7845</p>
</div>
<!-- COLUMN 2 — ABOUT G3TI -->
<div>
<h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">About G3TI</h4>
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:10px;"><a href="/about-g3ti.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">About G3TI</a></li>
<li style="margin-bottom:10px;"><a href="/manifesto.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Manifesto</a></li>
<li style="margin-bottom:10px;"><a href="/about.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Origin Dossier</a></li>
<li style="margin-bottom:10px;"><a href="/hbcu-alliance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">HBCU Intelligence Alliance™</a></li>
<li style="margin-bottom:10px;"><a href="/why-g3ti.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Why G3TI</a></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Careers</span></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Executive Leadership</span></li>
</ul>
</div>
<!-- COLUMN 3 — SOLUTIONS -->
<div>
<h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Solutions</h4>
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:10px;"><a href="/solutions.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Solutions Overview</a></li>
<li style="margin-bottom:10px;"><a href="/solutions-government.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Government Intelligence Solutions</a></li>
<li style="margin-bottom:10px;"><a href="/solutions-law-enforcement.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Law Enforcement Intelligence Solutions</a></li>
<li style="margin-bottom:10px;"><a href="/solutions-enterprise.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Enterprise Intelligence Solutions</a></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">AI-Driven Risk Mitigation</span></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Autonomous Threat Operations</span></li>
</ul>
</div>
<!-- COLUMN 4 — INTELLIGENCE RESOURCES -->
<div>
<h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Intelligence Resources</h4>
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:10px;"><a href="/threat-architecture.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Threat Architecture Whitepaper</a></li>
<li style="margin-bottom:10px;"><a href="/national-security-briefing.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">National Security Briefing Packet</a></li>
<li style="margin-bottom:10px;"><a href="/contractor-readiness.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Contractor Readiness Binder</a></li>
<li style="margin-bottom:10px;"><a href="/threat-architecture-addendum.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Threat Architecture Addendum</a></li>
<li style="margin-bottom:10px;"><a href="/intelligence-engine.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Intelligence Engine Overview</a></li>
<li style="margin-bottom:10px;"><a href="/news-intelligence.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">News & Intelligence</a></li>
</ul>
</div>
<!-- COLUMN 5 — COMPLIANCE & SECURITY -->
<div>
<h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Compliance & Security</h4>
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:10px;"><a href="/privacy-policy.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Privacy Policy</a></li>
<li style="margin-bottom:10px;"><a href="/terms-of-use.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Terms of Use</a></li>
<li style="margin-bottom:10px;"><a href="/security-notice.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Security Notice</a></li>
<li style="margin-bottom:10px;"><a href="/intellectual-property.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Intellectual Property</a></li>
<li style="margin-bottom:10px;"><a href="/ai-governance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">AI Governance</a></li>
<li style="margin-bottom:10px;"><a href="/responsible-ai.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Responsible AI</a></li>
<li style="margin-bottom:10px;"><a href="/data-governance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Data Governance</a></li>
<li style="margin-bottom:10px;"><a href="/zero-trust.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Zero Trust</a></li>
<li style="margin-bottom:10px;"><a href="/cjis-nist-readiness.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">CJIS/NIST Readiness</a></li>
<li style="margin-bottom:10px;"><a href="/responsible-disclosure.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Responsible Disclosure</a></li>
<li style="margin-bottom:10px;"><a href="/ai-misuse-prohibition.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">AI Misuse Policy</a></li>
<li style="margin-bottom:10px;"><a href="/fedramp-alignment.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">FedRAMP Alignment Packet</a></li>
</ul>
</div>
<!-- COLUMN 6 — ACCESS & CONTACT -->
<div>
<h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Access & Contact</h4>
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:10px;"><a href="/contact.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Transmission Form (Secure Contact)</a></li>
<li style="margin-bottom:10px;"><a href="/contact.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Request a Demo</a></li>
<li style="margin-bottom:10px;"><a href="/government.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Government Access Portal</a></li>
<li style="margin-bottom:10px;"><a href="/law-enforcement.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;transition:color 0.3s;">Law Enforcement Access Portal</a></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Classified Request (Clearance Required)</span></li>
<li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Media / Press Inquiries</span></li>
</ul>
</div>
</div>
<!-- Footer Tagline -->
<div style="border-top:1px solid rgba(18,246,200,0.1);padding-top:30px;text-align:center;">
<p style="color:#12F6C8;font-size:0.85rem;font-style:italic;margin:0 0 15px 0;">"Autonomous Intelligence Engine Active — Monitoring Global Threat Surfaces in Real Time."</p>
<p style="color:#4b5563;font-size:0.75rem;margin:0;">© 2026 Global 3 Technology & Intelligence™. All rights reserved.</p>
</div>
</div>
<style>
.g3ti-footer-grid a:hover { color: #12F6C8 !important; }
@media (max-width: 1200px) { .g3ti-footer-grid { grid-template-columns: repeat(3, 1fr) !important; } }
@media (max-width: 768px) { .g3ti-footer-grid { grid-template-columns: 1fr !important; } }
</style>
</footer>'''

# Federal Proposal Footer HTML (to be added after the mega-footer)
FEDERAL_FOOTER_HTML = '''<!-- Federal Proposal Footer - Isolated Component -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<div class="federal-proposal-footer" id="federal-proposal-footer">
    <div class="federal-proposal-footer-container">
        <p class="federal-proposal-footer-title">GLOBAL 3 TECHNOLOGY &amp; INTELLIGENCE&#8482;</p>
        <p class="federal-proposal-footer-subtitle">Unsolicited Proposal Grade &ndash; Federal &amp; Law Enforcement Engagement</p>
        <p class="federal-proposal-footer-tagline">Autonomous Protective Intelligence for the AI Threat Era</p>
        <p class="federal-proposal-footer-veteran">Veteran-Owned Technology &amp; Intelligence Company</p>
        <div class="federal-proposal-footer-divider"></div>
        <p class="federal-proposal-footer-compliance-label">Compliance &amp; Readiness:</p>
        <p class="federal-proposal-footer-compliance-items">CJIS | NIST 800-53 | Zero Trust | AI Governance | Data Protection</p>
    </div>
</div>
<!-- End Federal Proposal Footer -->'''

# Federal Footer CSS
FEDERAL_FOOTER_CSS = '''<link rel="stylesheet" href="/components/federal-footer/federal-footer.css">'''

def update_html_file(filepath):
    """Update a single HTML file with the mega-footer."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Remove old footer override scripts
    content = re.sub(r'<script>\s*// G3TI Footer Override Script.*?</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*// G3TI Maximum 6-Column Footer.*?</script>', '', content, flags=re.DOTALL)
    
    # Remove old footer-g3ti-max CSS link
    content = re.sub(r'<link rel="stylesheet" href="/components/footer-g3ti-max/footer-g3ti-max\.css">\s*', '', content)
    
    # Remove old federal footer CSS link (we'll add it back in the right place)
    content = re.sub(r'<link rel="stylesheet" href="/components/federal-footer/federal-footer\.css">\s*', '', content)
    
    # Remove existing federal proposal footer div
    content = re.sub(r'<!-- Federal Proposal Footer.*?<!-- End Federal Proposal Footer -->', '', content, flags=re.DOTALL)
    
    # Remove any existing footer element (various patterns)
    # Pattern 1: Static footer with inline styles
    content = re.sub(r'<footer style="background:#050505.*?</footer>', '', content, flags=re.DOTALL)
    # Pattern 2: Footer with class
    content = re.sub(r'<footer class="[^"]*"[^>]*>.*?</footer>', '', content, flags=re.DOTALL)
    # Pattern 3: Plain footer tag
    content = re.sub(r'<footer>.*?</footer>', '', content, flags=re.DOTALL)
    
    # Clean up multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Find the position to insert the footer (before </body> or before navbar script)
    # We want to insert the footer before the navbar injection script
    
    # Check if there's a navbar script
    navbar_match = re.search(r'<script id="g3ti-navbar-v4-injector">', content)
    
    if navbar_match:
        # Insert footer before the navbar script
        insert_pos = navbar_match.start()
        content = content[:insert_pos] + MEGA_FOOTER_HTML + '\n' + FEDERAL_FOOTER_CSS + '\n' + FEDERAL_FOOTER_HTML + '\n' + content[insert_pos:]
    elif '</body>' in content:
        # Insert before </body>
        content = content.replace('</body>', MEGA_FOOTER_HTML + '\n' + FEDERAL_FOOTER_CSS + '\n' + FEDERAL_FOOTER_HTML + '\n</body>')
    else:
        print(f"  Warning: No </body> tag found in {filepath.name}")
        return False
    
    # Only write if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    else:
        print(f"  Skipping {filepath.name} - no changes needed")
        return False

def main():
    """Process all HTML files in the out directory."""
    html_files = list(OUT_DIR.glob('**/*.html'))
    print(f"Found {len(html_files)} HTML files")
    
    updated = 0
    skipped = 0
    errors = 0
    
    for filepath in html_files:
        # Skip files in components directory
        if 'components' in str(filepath):
            print(f"Skipping component: {filepath.name}")
            skipped += 1
            continue
        
        print(f"Processing: {filepath.relative_to(OUT_DIR)}")
        try:
            if update_html_file(filepath):
                updated += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  Error: {e}")
            errors += 1
    
    print(f"\nDone! Updated {updated} files, skipped {skipped} files, {errors} errors")

if __name__ == '__main__':
    main()
