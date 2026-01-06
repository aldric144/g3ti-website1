#!/bin/bash

# Post-process script for G3TI D.I.E. static export
# This script creates .html files for all routes and updates internal links

OUT_DIR="out"

echo "Starting post-processing..."

# Function to create .html file from directory index
create_html_files() {
    find "$OUT_DIR" -type f -name "index.html" | while read -r file; do
        dir=$(dirname "$file")
        if [ "$dir" != "$OUT_DIR" ]; then
            parent=$(dirname "$dir")
            name=$(basename "$dir")
            new_file="$parent/$name.html"
            cp "$file" "$new_file"
            echo "Created: $new_file"
        fi
    done
}

# Function to update links in HTML files to use .html extension
update_links() {
    find "$OUT_DIR" -type f -name "*.html" | while read -r file; do
        # Update href links to use .html extension
        sed -i 's|href="/about"|href="/about.html"|g' "$file"
        sed -i 's|href="/government"|href="/government.html"|g' "$file"
        sed -i 's|href="/enterprise"|href="/enterprise.html"|g' "$file"
        sed -i 's|href="/products"|href="/products.html"|g' "$file"
        sed -i 's|href="/contact"|href="/contact.html"|g' "$file"
        
        # Product pages
        sed -i 's|href="/products/ghostquant-ai"|href="/products/ghostquant-ai.html"|g' "$file"
        sed -i 's|href="/products/id-shield"|href="/products/id-shield.html"|g' "$file"
        sed -i 's|href="/products/scamfirewall360"|href="/products/scamfirewall360.html"|g' "$file"
        sed -i 's|href="/products/heartguard-ai"|href="/products/heartguard-ai.html"|g' "$file"
        sed -i 's|href="/products/homelandwatch7"|href="/products/homelandwatch7.html"|g' "$file"
        
        # Dossier pages
        sed -i 's|href="/dossiers/threat-architecture"|href="/dossiers/threat-architecture.html"|g' "$file"
        sed -i 's|href="/dossiers/contractor-readiness"|href="/dossiers/contractor-readiness.html"|g' "$file"
        sed -i 's|href="/dossiers/national-security-briefing"|href="/dossiers/national-security-briefing.html"|g' "$file"
        sed -i 's|href="/dossiers/addendum"|href="/dossiers/addendum.html"|g' "$file"
        
        # Compliance pages
        sed -i 's|href="/compliance/ai-governance"|href="/compliance/ai-governance.html"|g' "$file"
        sed -i 's|href="/compliance/responsible-ai"|href="/compliance/responsible-ai.html"|g' "$file"
        sed -i 's|href="/compliance/data-governance"|href="/compliance/data-governance.html"|g' "$file"
        sed -i 's|href="/compliance/zero-trust"|href="/compliance/zero-trust.html"|g' "$file"
        sed -i 's|href="/compliance/cjis-nist"|href="/compliance/cjis-nist.html"|g' "$file"
        sed -i 's|href="/compliance/responsible-disclosure"|href="/compliance/responsible-disclosure.html"|g' "$file"
        sed -i 's|href="/compliance/human-protection-pledge"|href="/compliance/human-protection-pledge.html"|g' "$file"
        sed -i 's|href="/compliance/ai-misuse-prohibition"|href="/compliance/ai-misuse-prohibition.html"|g' "$file"
        sed -i 's|href="/compliance/fedramp-alignment"|href="/compliance/fedramp-alignment.html"|g' "$file"
        
        # Legal pages
        sed -i 's|href="/legal/privacy-policy"|href="/legal/privacy-policy.html"|g' "$file"
        sed -i 's|href="/legal/terms-of-use"|href="/legal/terms-of-use.html"|g' "$file"
        sed -i 's|href="/legal/security-notice"|href="/legal/security-notice.html"|g' "$file"
        sed -i 's|href="/legal/intellectual-property"|href="/legal/intellectual-property.html"|g' "$file"
        
        echo "Updated links in: $file"
    done
}

# Run the post-processing
create_html_files
update_links

echo "Post-processing complete!"
echo "Total HTML files:"
find "$OUT_DIR" -type f -name "*.html" | wc -l
