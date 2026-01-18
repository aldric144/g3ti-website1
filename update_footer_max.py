#!/usr/bin/env python3
"""
Script to update all HTML pages with the new 6-column G3TI footer.
Removes old footer injection and adds new footer-g3ti-max above federal-proposal-footer.
"""

import os
import re
from pathlib import Path

# Directory containing HTML files
OUT_DIR = Path("/home/ubuntu/repos/g3ti-website1/out")

# New footer injection script (replaces old footer, adds new 6-column footer)
NEW_FOOTER_SCRIPT = '''
<link rel="stylesheet" href="/components/footer-g3ti-max/footer-g3ti-max.css">
<script>
// G3TI Maximum 6-Column Footer - Replaces old footer
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Remove any existing footer
        var existingFooter = document.querySelector('footer');
        if (existingFooter) {
            existingFooter.remove();
        }
        
        // Remove old g3ti-federal-footer if exists
        var oldFederalFooter = document.getElementById('g3ti-federal-footer');
        if (oldFederalFooter) {
            oldFederalFooter.remove();
        }
        
        // Find the main content area or body
        var mainContent = document.querySelector('main') || document.body;
        
        // Create the new 6-column footer
        var newFooter = document.createElement('footer');
        newFooter.className = 'footer-g3ti-max';
        newFooter.id = 'footer-g3ti-max';
        newFooter.innerHTML = `
            <div class="footer-g3ti-max-content">
                <!-- Column 1: G3TI CORE -->
                <div class="footer-g3ti-max-column footer-g3ti-max-core">
                    <div class="footer-g3ti-max-column-header">G3TI Core</div>
                    <div class="footer-g3ti-max-core-title">GLOBAL 3 TECHNOLOGY & INTELLIGENCE&trade;</div>
                    <div class="footer-g3ti-max-core-tagline">Autonomous Protective Intelligence for the AI Threat Era</div>
                    <div class="footer-g3ti-max-core-veteran">Veteran-Owned Technology & Intelligence Company</div>
                    <div class="footer-g3ti-max-core-location">Palm Beach, FL</div>
                    <div class="footer-g3ti-max-core-phone">Phone: 1-888-603-7845</div>
                </div>

                <!-- Column 2: ABOUT G3TI -->
                <div class="footer-g3ti-max-column">
                    <div class="footer-g3ti-max-column-header">About G3TI</div>
                    <ul>
                        <li><a href="/about.html">About G3TI</a></li>
                        <li><a href="/manifesto.html">Manifesto</a></li>
                        <li><a href="/origin-dossier.html">Origin Dossier</a></li>
                        <li><a href="/hbcu-alliance.html">HBCU Intelligence Alliance&trade;</a></li>
                        <li><a href="/why-g3ti.html">Why G3TI</a></li>
                        <li><span class="inactive">Careers</span></li>
                        <li><span class="inactive">Executive Leadership</span></li>
                    </ul>
                </div>

                <!-- Column 3: SOLUTIONS -->
                <div class="footer-g3ti-max-column">
                    <div class="footer-g3ti-max-column-header">Solutions</div>
                    <ul>
                        <li><a href="/solutions.html">Solutions Overview</a></li>
                        <li><a href="/solutions-government.html">Government Intelligence Solutions</a></li>
                        <li><a href="/solutions-law-enforcement.html">Law Enforcement Intelligence Solutions</a></li>
                        <li><a href="/solutions-enterprise.html">Enterprise Intelligence Solutions</a></li>
                        <li><span class="inactive">AI-Driven Risk Mitigation</span></li>
                        <li><span class="inactive">Autonomous Threat Operations</span></li>
                    </ul>
                </div>

                <!-- Column 4: INTELLIGENCE RESOURCES -->
                <div class="footer-g3ti-max-column">
                    <div class="footer-g3ti-max-column-header">Intelligence Resources</div>
                    <ul>
                        <li><span class="inactive">Threat Architecture Whitepaper</span></li>
                        <li><span class="inactive">National Security Briefing Packet</span></li>
                        <li><span class="inactive">Contractor Readiness Binder</span></li>
                        <li><span class="inactive">Threat Architecture Addendum</span></li>
                        <li><a href="/intelligence-engine.html">Intelligence Engine Overview</a></li>
                        <li><a href="/news-intelligence.html">News & Intelligence</a></li>
                    </ul>
                </div>

                <!-- Column 5: COMPLIANCE & SECURITY -->
                <div class="footer-g3ti-max-column">
                    <div class="footer-g3ti-max-column-header">Compliance & Security</div>
                    <ul>
                        <li><a href="/privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="/terms-of-use.html">Terms of Use</a></li>
                        <li><a href="/security-notice.html">Security Notice</a></li>
                        <li><a href="/intellectual-property.html">Intellectual Property</a></li>
                        <li><span class="inactive">AI Governance</span></li>
                        <li><span class="inactive">Responsible AI</span></li>
                        <li><span class="inactive">Data Governance</span></li>
                        <li><span class="inactive">Zero Trust</span></li>
                        <li><span class="inactive">CJIS/NIST Readiness</span></li>
                        <li><span class="inactive">Responsible Disclosure</span></li>
                        <li><span class="inactive">AI Misuse Policy</span></li>
                        <li><span class="inactive">FedRAMP Alignment Packet</span></li>
                    </ul>
                </div>

                <!-- Column 6: ACCESS & CONTACT -->
                <div class="footer-g3ti-max-column">
                    <div class="footer-g3ti-max-column-header">Access & Contact</div>
                    <ul>
                        <li><a href="/contact.html">Transmission Form</a></li>
                        <li><a href="/demo.html">Request a Demo</a></li>
                        <li><a href="/government.html">Government Access Portal</a></li>
                        <li><a href="/law-enforcement.html">Law Enforcement Access Portal</a></li>
                        <li><span class="inactive">Classified Request (Clearance Required)</span></li>
                        <li><span class="inactive">Media / Press Inquiries</span></li>
                    </ul>
                </div>
            </div>

            <div class="footer-g3ti-max-bottom">
                <div class="footer-g3ti-max-tagline">"Autonomous Intelligence Engine Active — Monitoring Global Threat Surfaces in Real Time."</div>
                <div class="footer-g3ti-max-copyright">&copy; 2026 Global 3 Technology & Intelligence&trade;. All rights reserved.</div>
            </div>
        `;
        
        // Insert the new footer before the federal-proposal-footer or at the end of body
        var federalFooter = document.getElementById('federal-proposal-footer');
        if (federalFooter) {
            federalFooter.parentNode.insertBefore(newFooter, federalFooter);
        } else {
            // If no federal footer yet, insert before closing body
            document.body.appendChild(newFooter);
        }
    }, 600);
});
</script>

<link rel="stylesheet" href="/components/federal-footer/federal-footer.css">
<script>
// Federal Proposal Footer - Added BELOW the new 6-column footer
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // Check if federal proposal footer already exists
        if (document.getElementById('federal-proposal-footer')) return;
        
        // Find the new 6-column footer
        var mainFooter = document.getElementById('footer-g3ti-max');
        if (mainFooter) {
            // Create the federal proposal footer element
            var federalProposalFooter = document.createElement('div');
            federalProposalFooter.id = 'federal-proposal-footer';
            federalProposalFooter.className = 'federal-proposal-footer';
            federalProposalFooter.innerHTML = `
                <div class="federal-proposal-footer-container">
                    <p class="federal-proposal-footer-title">GLOBAL 3 TECHNOLOGY & INTELLIGENCE&trade;</p>
                    <p class="federal-proposal-footer-subtitle">Unsolicited Proposal Grade – Federal & Law Enforcement Engagement</p>
                    <p class="federal-proposal-footer-tagline">Autonomous Protective Intelligence for the AI Threat Era</p>
                    <p class="federal-proposal-footer-veteran">Veteran-Owned Technology & Intelligence Company</p>
                    <div class="federal-proposal-footer-divider"></div>
                    <p class="federal-proposal-footer-compliance-label">Compliance & Readiness:</p>
                    <p class="federal-proposal-footer-compliance-items">CJIS | NIST 800-53 | Zero Trust | AI Governance | Data Protection</p>
                </div>
            `;
            
            // Insert AFTER the main footer
            mainFooter.parentNode.insertBefore(federalProposalFooter, mainFooter.nextSibling);
        }
    }, 700);
});
</script>
'''

def update_html_file(filepath):
    """Update a single HTML file with the new footer injection script."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove old footer CSS link
    content = re.sub(r'<link rel="stylesheet" href="/assets/css/footer\.css">\s*', '', content)
    
    # Remove old footer injection script (the animated federal footer)
    # Pattern to match the old footer script block
    old_footer_pattern = r'<script>\s*// G3TI Animated Federal-Grade Footer.*?</script>\s*'
    content = re.sub(old_footer_pattern, '', content, flags=re.DOTALL)
    
    # Remove old federal proposal footer script if it exists separately
    old_federal_pattern = r'<link rel="stylesheet" href="/components/federal-footer/federal-footer\.css">\s*<script>\s*// Federal Proposal Footer.*?</script>\s*'
    content = re.sub(old_federal_pattern, '', content, flags=re.DOTALL)
    
    # Also remove any standalone federal footer CSS link
    content = re.sub(r'<link rel="stylesheet" href="/components/federal-footer/federal-footer\.css">\s*', '', content)
    
    # Check if new footer script already exists
    if 'footer-g3ti-max' in content:
        print(f"  Skipping {filepath.name} - already has new footer")
        return False
    
    # Insert new footer script before </body>
    if '</body>' in content:
        content = content.replace('</body>', NEW_FOOTER_SCRIPT + '</body>')
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
