#!/usr/bin/env python3
"""
Script to add CSS to hide React-rendered footer and show only static mega-footer.
"""

import os
import re
from pathlib import Path

# Directory containing HTML files
OUT_DIR = Path("/home/ubuntu/repos/g3ti-website1/out")

# CSS to hide React-rendered footer
FOOTER_HIDE_CSS = '''<style id="hide-react-footer">
/* Hide React-rendered footer, show only static mega-footer */
body > div:first-of-type > footer { display: none !important; }
footer.g3ti-mega-footer { display: block !important; }
</style>'''

def update_html_file(filepath):
    """Update a single HTML file to hide React footer."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Check if CSS already exists
    if 'hide-react-footer' in content:
        return False
    
    # Add CSS after the existing hide-react-nav style or in head
    if '<style id="hide-react-nav">' in content:
        # Add after the existing hide-react-nav style
        content = content.replace(
            '</style></head>',
            '</style>' + FOOTER_HIDE_CSS + '</head>',
            1
        )
    elif '</head>' in content:
        # Add before </head>
        content = content.replace('</head>', FOOTER_HIDE_CSS + '</head>', 1)
    else:
        print(f"  Warning: No </head> tag found in {filepath.name}")
        return False
    
    # Also add class to the static mega-footer
    content = content.replace(
        '<footer style="background:#050505;border-top:1px solid rgba(18,246,200,0.1);padding:60px 20px 30px;margin-top:80px;">',
        '<footer class="g3ti-mega-footer" style="background:#050505;border-top:1px solid rgba(18,246,200,0.1);padding:60px 20px 30px;margin-top:80px;">'
    )
    
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
