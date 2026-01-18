#!/usr/bin/env python3
"""
Script to update the navigation bar across all HTML pages.
Updates the navbar to match the user's requested order and adds Dossiers tab.
"""

import os
import re
from pathlib import Path

# Directory containing HTML files
OUT_DIR = Path("/home/ubuntu/repos/g3ti-website1/out")

# New navbar HTML with correct order:
# Home, Government, Law Enforcement, Enterprise, Products, Dossiers, Compliance, News & Intelligence, About, Intelligence Engine, Why G3TI, Contact
NEW_NAVBAR_SCRIPT = '''<script id="g3ti-navbar-v4-injector">
(function() {
  function injectNavbar() {
    // Remove any previous navbar attempts
    var oldNavs = document.querySelectorAll('#g3ti-navbar, #g3ti-navbar-v3, #g3ti-navbar-v4, [id^="g3ti-navbar"]');
    oldNavs.forEach(function(el) { el.remove(); });
    var oldScripts = document.querySelectorAll('[id^="g3ti-navbar-injector"]');
    oldScripts.forEach(function(el) { if (el.id !== 'g3ti-navbar-v4-injector') el.remove(); });
    
    var navbarHTML = `<header id="g3ti-navbar-v4" style="position:fixed;top:0;left:0;right:0;z-index:9999;background:rgba(5,5,5,0.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(18,246,200,0.1);"><style>.g3ti-dropdown{position:relative;display:inline-block;}.g3ti-dropdown-trigger{cursor:pointer;color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;display:flex;align-items:center;}.g3ti-dropdown-trigger:hover{color:#12F6C8;}.g3ti-dropdown-trigger::after{content:'▼';font-size:0.5rem;margin-left:0.25rem;}.g3ti-dropdown-menu{position:absolute;top:100%;left:0;background:rgba(5,5,5,0.98);border:1px solid rgba(18,246,200,0.2);border-radius:8px;padding:0.5rem 0;min-width:200px;opacity:0;visibility:hidden;transform:translateY(-10px);transition:all 0.3s;z-index:9999;}.g3ti-dropdown:hover .g3ti-dropdown-menu,.g3ti-dropdown.active .g3ti-dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);}.g3ti-dropdown-menu a{display:block;padding:0.75rem 1rem;color:#9ca3af;text-decoration:none;font-size:0.75rem;transition:all 0.3s;}.g3ti-dropdown-menu a:hover{color:#12F6C8;background:rgba(18,246,200,0.05);}</style><nav style="max-width:1400px;margin:0 auto;padding:0.75rem 1.5rem;display:flex;align-items:center;justify-content:space-between;"><a href="/" style="display:flex;align-items:center;gap:0.75rem;text-decoration:none;"><div style="width:36px;height:36px;background:linear-gradient(135deg,#12F6C8,#0B85E5);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;color:black;font-size:0.875rem;">G3</div><div><div style="color:#12F6C8;font-weight:bold;font-size:1rem;">G3TI</div><div style="color:#6b7280;font-size:0.65rem;">D.I.E. SYSTEM</div></div></a><div style="display:flex;gap:0;align-items:center;flex-wrap:nowrap;overflow:visible;"><a href="/" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Home</a><a href="/government.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Government</a><a href="/law-enforcement.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Law Enforcement</a><a href="/enterprise.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Enterprise</a><a href="/products.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Products</a><div class="g3ti-dropdown"><span class="g3ti-dropdown-trigger">Dossiers</span><div class="g3ti-dropdown-menu"><a href="/dossiers/threat-architecture.html">Threat Architecture</a><a href="/dossiers/national-security-briefing.html">National Security Briefing</a><a href="/dossiers/contractor-readiness.html">Contractor Readiness</a><a href="/dossiers/addendum.html">Addendum</a></div></div><a href="/compliance/ai-governance.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Compliance</a><a href="/news-intelligence.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">News & Intelligence</a><div class="g3ti-dropdown"><span class="g3ti-dropdown-trigger">About</span><div class="g3ti-dropdown-menu"><a href="/about.html">About G3TI</a><a href="/manifesto.html">Manifesto</a><a href="/hbcu-alliance.html">HBCU Intelligence Alliance</a></div></div><a href="/intelligence-engine.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Intelligence Engine</a><a href="/why-g3ti.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Why G3TI</a><a href="/contact.html" style="color:#9ca3af;text-decoration:none;font-size:0.75rem;font-weight:500;padding:0.5rem 0.6rem;white-space:nowrap;">Contact</a></div></nav></header>`;
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Dropdown click handler for mobile
    document.querySelectorAll('.g3ti-dropdown-trigger').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.parentElement.classList.toggle('active');
      });
    });
    document.addEventListener('click', function() {
      document.querySelectorAll('.g3ti-dropdown').forEach(function(d) { d.classList.remove('active'); });
    });
    // Hide React navbar if exists
    var reactNav = document.querySelector('body > div > nav');
    if (reactNav) reactNav.style.display = 'none';
    
    // Add hover effects
    var links = document.querySelectorAll('#g3ti-navbar-v4 a[href^="/"]');
    links.forEach(function(link) {
      var originalColor = link.style.color;
      link.addEventListener('mouseenter', function() { this.style.color = '#12F6C8'; });
      link.addEventListener('mouseleave', function() { this.style.color = originalColor; });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(injectNavbar, 100); });
  } else {
    setTimeout(injectNavbar, 100);
  }
  window.addEventListener('load', function() { setTimeout(injectNavbar, 500); });
})();
</script>'''

def update_html_file(filepath):
    """Update a single HTML file with the new navbar injection script."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove old navbar injection script (v3)
    old_navbar_pattern = r'<script id="g3ti-navbar-v3-injector">.*?</script>'
    content = re.sub(old_navbar_pattern, '', content, flags=re.DOTALL)
    
    # Remove old navbar injection script (v4 if exists)
    old_navbar_v4_pattern = r'<script id="g3ti-navbar-v4-injector">.*?</script>'
    content = re.sub(old_navbar_v4_pattern, '', content, flags=re.DOTALL)
    
    # Check if new navbar script already exists
    if 'g3ti-navbar-v4-injector' in content:
        print(f"  Skipping {filepath.name} - already has new navbar")
        return False
    
    # Insert new navbar script before </body>
    if '</body>' in content:
        content = content.replace('</body>', NEW_NAVBAR_SCRIPT + '</body>')
    else:
        print(f"  Warning: No </body> tag found in {filepath.name}")
        return False
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """Process all HTML files in the out directory."""
    html_files = list(OUT_DIR.glob('**/*.html'))
    print(f"Found {len(html_files)} HTML files")
    
    updated = 0
    skipped = 0
    
    for filepath in html_files:
        # Skip files in components directory
        if 'components' in str(filepath):
            continue
        
        print(f"Processing: {filepath.name}")
        if update_html_file(filepath):
            updated += 1
        else:
            skipped += 1
    
    print(f"\nDone! Updated {updated} files, skipped {skipped} files")

if __name__ == '__main__':
    main()
