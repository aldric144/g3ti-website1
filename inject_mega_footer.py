#!/usr/bin/env python3
"""
Script to inject mega-footer via JavaScript after page load.
This replaces the React-rendered footer with the correct 6-column mega-footer.
"""

import os
import re
from pathlib import Path

# Directory containing HTML files
OUT_DIR = Path("/home/ubuntu/repos/g3ti-website1/out")

# JavaScript to inject mega-footer
MEGA_FOOTER_SCRIPT = '''<script id="g3ti-mega-footer-injector">
// G3TI Mega-Footer Injection Script
(function() {
    function injectMegaFooter() {
        // Find and remove any existing footer
        var existingFooters = document.querySelectorAll('footer');
        existingFooters.forEach(function(f) {
            f.remove();
        });
        
        // Remove any existing federal footer
        var existingFederalFooter = document.getElementById('federal-proposal-footer');
        if (existingFederalFooter) {
            existingFederalFooter.remove();
        }
        
        // Create the mega-footer
        var megaFooter = document.createElement('footer');
        megaFooter.className = 'g3ti-mega-footer';
        megaFooter.style.cssText = 'background:#050505;border-top:1px solid rgba(18,246,200,0.1);padding:60px 20px 30px;margin-top:80px;';
        megaFooter.innerHTML = '<div style="max-width:1400px;margin:0 auto;"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:40px;margin-bottom:40px;" class="g3ti-footer-grid"><div><div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;"><div style="width:40px;height:40px;background:linear-gradient(135deg,#12F6C8,#0B85E5);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;color:black;font-size:1rem;">G3</div><span style="color:#12F6C8;font-weight:bold;font-size:1.1rem;">G3TI</span></div><p style="color:#9ca3af;font-size:0.85rem;line-height:1.6;margin:0 0 8px 0;">GLOBAL 3 TECHNOLOGY & INTELLIGENCE\\u2122</p><p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Autonomous Protective Intelligence for the AI Threat Era</p><p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Veteran-Owned Technology & Intelligence Company</p><p style="color:#6b7280;font-size:0.75rem;line-height:1.5;margin:0 0 8px 0;">Palm Beach, FL</p><p style="color:#12F6C8;font-size:0.75rem;line-height:1.5;margin:0;">Phone: 1-888-603-7845</p></div><div><h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">About G3TI</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:10px;"><a href="/about-g3ti.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">About G3TI</a></li><li style="margin-bottom:10px;"><a href="/manifesto.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Manifesto</a></li><li style="margin-bottom:10px;"><a href="/about.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Origin Dossier</a></li><li style="margin-bottom:10px;"><a href="/hbcu-alliance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">HBCU Intelligence Alliance\\u2122</a></li><li style="margin-bottom:10px;"><a href="/why-g3ti.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Why G3TI</a></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Careers</span></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Executive Leadership</span></li></ul></div><div><h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Solutions</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:10px;"><a href="/solutions.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Solutions Overview</a></li><li style="margin-bottom:10px;"><a href="/solutions-government.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Government Intelligence Solutions</a></li><li style="margin-bottom:10px;"><a href="/solutions-law-enforcement.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Law Enforcement Intelligence Solutions</a></li><li style="margin-bottom:10px;"><a href="/solutions-enterprise.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Enterprise Intelligence Solutions</a></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">AI-Driven Risk Mitigation</span></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Autonomous Threat Operations</span></li></ul></div><div><h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Intelligence Resources</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:10px;"><a href="/threat-architecture.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Threat Architecture Whitepaper</a></li><li style="margin-bottom:10px;"><a href="/national-security-briefing.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">National Security Briefing Packet</a></li><li style="margin-bottom:10px;"><a href="/contractor-readiness.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Contractor Readiness Binder</a></li><li style="margin-bottom:10px;"><a href="/threat-architecture-addendum.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Threat Architecture Addendum</a></li><li style="margin-bottom:10px;"><a href="/intelligence-engine.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Intelligence Engine Overview</a></li><li style="margin-bottom:10px;"><a href="/news-intelligence.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">News & Intelligence</a></li></ul></div><div><h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Compliance & Security</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:10px;"><a href="/privacy-policy.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Privacy Policy</a></li><li style="margin-bottom:10px;"><a href="/terms-of-use.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Terms of Use</a></li><li style="margin-bottom:10px;"><a href="/security-notice.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Security Notice</a></li><li style="margin-bottom:10px;"><a href="/intellectual-property.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Intellectual Property</a></li><li style="margin-bottom:10px;"><a href="/ai-governance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">AI Governance</a></li><li style="margin-bottom:10px;"><a href="/responsible-ai.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Responsible AI</a></li><li style="margin-bottom:10px;"><a href="/data-governance.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Data Governance</a></li><li style="margin-bottom:10px;"><a href="/zero-trust.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Zero Trust</a></li><li style="margin-bottom:10px;"><a href="/cjis-nist-readiness.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">CJIS/NIST Readiness</a></li><li style="margin-bottom:10px;"><a href="/responsible-disclosure.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Responsible Disclosure</a></li><li style="margin-bottom:10px;"><a href="/ai-misuse-prohibition.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">AI Misuse Policy</a></li><li style="margin-bottom:10px;"><a href="/fedramp-alignment.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">FedRAMP Alignment Packet</a></li></ul></div><div><h4 style="color:#12F6C8;font-size:0.85rem;font-weight:600;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:0.05em;">Access & Contact</h4><ul style="list-style:none;padding:0;margin:0;"><li style="margin-bottom:10px;"><a href="/contact.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Transmission Form (Secure Contact)</a></li><li style="margin-bottom:10px;"><a href="/contact.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Request a Demo</a></li><li style="margin-bottom:10px;"><a href="/government.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Government Access Portal</a></li><li style="margin-bottom:10px;"><a href="/law-enforcement.html" style="color:#9ca3af;text-decoration:none;font-size:0.8rem;">Law Enforcement Access Portal</a></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Classified Request (Clearance Required)</span></li><li style="margin-bottom:10px;"><span style="color:#4b5563;font-size:0.8rem;">Media / Press Inquiries</span></li></ul></div></div><div style="border-top:1px solid rgba(18,246,200,0.1);padding-top:30px;text-align:center;"><p style="color:#12F6C8;font-size:0.85rem;font-style:italic;margin:0 0 15px 0;">"Autonomous Intelligence Engine Active \\u2014 Monitoring Global Threat Surfaces in Real Time."</p><p style="color:#4b5563;font-size:0.75rem;margin:0;">\\u00A9 2026 Global 3 Technology & Intelligence\\u2122. All rights reserved.</p></div></div><style>.g3ti-footer-grid a:hover { color: #12F6C8 !important; }@media (max-width: 1200px) { .g3ti-footer-grid { grid-template-columns: repeat(3, 1fr) !important; } }@media (max-width: 768px) { .g3ti-footer-grid { grid-template-columns: 1fr !important; } }</style>';
        
        // Create federal proposal footer
        var federalFooter = document.createElement('div');
        federalFooter.id = 'federal-proposal-footer';
        federalFooter.className = 'federal-proposal-footer';
        federalFooter.innerHTML = '<div class="federal-proposal-footer-container"><p class="federal-proposal-footer-title">GLOBAL 3 TECHNOLOGY & INTELLIGENCE\\u2122</p><p class="federal-proposal-footer-subtitle">Unsolicited Proposal Grade \\u2013 Federal & Law Enforcement Engagement</p><p class="federal-proposal-footer-tagline">Autonomous Protective Intelligence for the AI Threat Era</p><p class="federal-proposal-footer-veteran">Veteran-Owned Technology & Intelligence Company</p><div class="federal-proposal-footer-divider"></div><p class="federal-proposal-footer-compliance-label">Compliance & Readiness:</p><p class="federal-proposal-footer-compliance-items">CJIS | NIST 800-53 | Zero Trust | AI Governance | Data Protection</p></div>';
        
        // Find the main content area and append footers
        var main = document.querySelector('main');
        if (main && main.parentNode) {
            main.parentNode.appendChild(megaFooter);
            main.parentNode.appendChild(federalFooter);
        } else {
            document.body.appendChild(megaFooter);
            document.body.appendChild(federalFooter);
        }
    }
    
    // Run after DOM is ready and after a short delay for React hydration
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(injectMegaFooter, 500);
        });
    } else {
        setTimeout(injectMegaFooter, 500);
    }
})();
</script>'''

# Federal Footer CSS link
FEDERAL_FOOTER_CSS = '<link rel="stylesheet" href="/components/federal-footer/federal-footer.css">'

def update_html_file(filepath):
    """Update a single HTML file with the mega-footer injection script."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Remove old mega-footer injector script if exists
    content = re.sub(r'<script id="g3ti-mega-footer-injector">.*?</script>', '', content, flags=re.DOTALL)
    
    # Remove old hide-react-footer style
    content = re.sub(r'<style id="hide-react-footer">.*?</style>', '', content, flags=re.DOTALL)
    
    # Remove old static mega-footer (we'll use JS injection instead)
    content = re.sub(r'<footer class="g3ti-mega-footer"[^>]*>.*?</footer>', '', content, flags=re.DOTALL)
    content = re.sub(r'<footer style="background:#050505;border-top:1px solid rgba\(18,246,200,0\.1\).*?</footer>', '', content, flags=re.DOTALL)
    
    # Remove old federal footer HTML (we'll inject via JS)
    content = re.sub(r'<!-- Federal Proposal Footer.*?<!-- End Federal Proposal Footer -->', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="federal-proposal-footer"[^>]*>.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Remove old federal footer CSS link (we'll add it back)
    content = re.sub(r'<link rel="stylesheet" href="/components/federal-footer/federal-footer\.css">\s*', '', content)
    
    # Remove Google fonts link for federal footer (we'll add it back)
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=Orbitron.*?rel="stylesheet">\s*', '', content)
    
    # Clean up multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    
    # Add the mega-footer injection script before </body>
    if '</body>' in content:
        injection = FEDERAL_FOOTER_CSS + '\n' + '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">\n' + MEGA_FOOTER_SCRIPT + '\n'
        content = content.replace('</body>', injection + '</body>')
    else:
        print(f"  Warning: No </body> tag found in {filepath.name}")
        return False
    
    # Only write if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    else:
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
