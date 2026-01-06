#!/bin/bash
# Post-process Next.js static export for DevinApps deployment
# This script copies route/index.html files to route.html for proper serving

OUT_DIR="out"

echo "Post-processing Next.js static export for DevinApps..."

# List of routes to process (excluding _next, g3ti assets, and index files)
ROUTES=(
  "about"
  "government"
  "enterprise"
  "products"
  "contact"
  "threat-architecture"
  "threat-architecture-addendum"
  "contractor-readiness"
  "national-security-briefing"
  "fedramp-alignment"
  "ai-governance"
  "responsible-ai"
  "data-governance"
  "zero-trust"
  "cjis-nist-readiness"
  "responsible-disclosure"
  "human-protection-pledge"
  "ai-misuse-prohibition"
  "privacy-policy"
  "terms-of-use"
  "security-notice"
  "intellectual-property"
)

# Product detail pages
PRODUCT_ROUTES=(
  "products/ghostquant-ai"
  "products/id-shield"
  "products/scamfirewall360"
  "products/heartguard-ai"
  "products/homelandwatch7"
)

# Copy route/index.html to route.html
for route in "${ROUTES[@]}"; do
  if [ -f "$OUT_DIR/$route/index.html" ]; then
    cp "$OUT_DIR/$route/index.html" "$OUT_DIR/$route.html"
    echo "Created $route.html"
  else
    echo "Warning: $OUT_DIR/$route/index.html not found"
  fi
done

# Copy product detail pages
for route in "${PRODUCT_ROUTES[@]}"; do
  if [ -f "$OUT_DIR/$route/index.html" ]; then
    # Create products-ghostquant-ai.html format
    flat_name=$(echo "$route" | tr '/' '-')
    cp "$OUT_DIR/$route/index.html" "$OUT_DIR/$flat_name.html"
    echo "Created $flat_name.html"
  else
    echo "Warning: $OUT_DIR/$route/index.html not found"
  fi
done

echo "Step 1 complete: Created .html files"
echo ""
echo "Step 2: Updating internal links to use .html extensions..."

# Function to update links in a file
update_links() {
  local file=$1
  
  # Update navigation and footer links
  sed -i 's|href="/about"|href="/about.html"|g' "$file"
  sed -i 's|href="/about/"|href="/about.html"|g' "$file"
  sed -i 's|href="/government"|href="/government.html"|g' "$file"
  sed -i 's|href="/government/"|href="/government.html"|g' "$file"
  sed -i 's|href="/enterprise"|href="/enterprise.html"|g' "$file"
  sed -i 's|href="/enterprise/"|href="/enterprise.html"|g' "$file"
  sed -i 's|href="/products"|href="/products.html"|g' "$file"
  sed -i 's|href="/products/"|href="/products.html"|g' "$file"
  sed -i 's|href="/contact"|href="/contact.html"|g' "$file"
  sed -i 's|href="/contact/"|href="/contact.html"|g' "$file"
  
  # Intelligence Dossiers
  sed -i 's|href="/threat-architecture"|href="/threat-architecture.html"|g' "$file"
  sed -i 's|href="/threat-architecture/"|href="/threat-architecture.html"|g' "$file"
  sed -i 's|href="/threat-architecture-addendum"|href="/threat-architecture-addendum.html"|g' "$file"
  sed -i 's|href="/threat-architecture-addendum/"|href="/threat-architecture-addendum.html"|g' "$file"
  sed -i 's|href="/contractor-readiness"|href="/contractor-readiness.html"|g' "$file"
  sed -i 's|href="/contractor-readiness/"|href="/contractor-readiness.html"|g' "$file"
  sed -i 's|href="/national-security-briefing"|href="/national-security-briefing.html"|g' "$file"
  sed -i 's|href="/national-security-briefing/"|href="/national-security-briefing.html"|g' "$file"
  
  # Compliance pages
  sed -i 's|href="/ai-governance"|href="/ai-governance.html"|g' "$file"
  sed -i 's|href="/ai-governance/"|href="/ai-governance.html"|g' "$file"
  sed -i 's|href="/responsible-ai"|href="/responsible-ai.html"|g' "$file"
  sed -i 's|href="/responsible-ai/"|href="/responsible-ai.html"|g' "$file"
  sed -i 's|href="/data-governance"|href="/data-governance.html"|g' "$file"
  sed -i 's|href="/data-governance/"|href="/data-governance.html"|g' "$file"
  sed -i 's|href="/zero-trust"|href="/zero-trust.html"|g' "$file"
  sed -i 's|href="/zero-trust/"|href="/zero-trust.html"|g' "$file"
  sed -i 's|href="/cjis-nist-readiness"|href="/cjis-nist-readiness.html"|g' "$file"
  sed -i 's|href="/cjis-nist-readiness/"|href="/cjis-nist-readiness.html"|g' "$file"
  sed -i 's|href="/responsible-disclosure"|href="/responsible-disclosure.html"|g' "$file"
  sed -i 's|href="/responsible-disclosure/"|href="/responsible-disclosure.html"|g' "$file"
  sed -i 's|href="/human-protection-pledge"|href="/human-protection-pledge.html"|g' "$file"
  sed -i 's|href="/human-protection-pledge/"|href="/human-protection-pledge.html"|g' "$file"
  sed -i 's|href="/ai-misuse-prohibition"|href="/ai-misuse-prohibition.html"|g' "$file"
  sed -i 's|href="/ai-misuse-prohibition/"|href="/ai-misuse-prohibition.html"|g' "$file"
  sed -i 's|href="/fedramp-alignment"|href="/fedramp-alignment.html"|g' "$file"
  sed -i 's|href="/fedramp-alignment/"|href="/fedramp-alignment.html"|g' "$file"
  
  # Legal pages
  sed -i 's|href="/privacy-policy"|href="/privacy-policy.html"|g' "$file"
  sed -i 's|href="/privacy-policy/"|href="/privacy-policy.html"|g' "$file"
  sed -i 's|href="/terms-of-use"|href="/terms-of-use.html"|g' "$file"
  sed -i 's|href="/terms-of-use/"|href="/terms-of-use.html"|g' "$file"
  sed -i 's|href="/security-notice"|href="/security-notice.html"|g' "$file"
  sed -i 's|href="/security-notice/"|href="/security-notice.html"|g' "$file"
  sed -i 's|href="/intellectual-property"|href="/intellectual-property.html"|g' "$file"
  sed -i 's|href="/intellectual-property/"|href="/intellectual-property.html"|g' "$file"
  
  # Product detail pages - use flat format
  sed -i 's|href="/products/ghostquant-ai"|href="/products-ghostquant-ai.html"|g' "$file"
  sed -i 's|href="/products/ghostquant-ai/"|href="/products-ghostquant-ai.html"|g' "$file"
  sed -i 's|href="/products/id-shield"|href="/products-id-shield.html"|g' "$file"
  sed -i 's|href="/products/id-shield/"|href="/products-id-shield.html"|g' "$file"
  sed -i 's|href="/products/scamfirewall360"|href="/products-scamfirewall360.html"|g' "$file"
  sed -i 's|href="/products/scamfirewall360/"|href="/products-scamfirewall360.html"|g' "$file"
  sed -i 's|href="/products/heartguard-ai"|href="/products-heartguard-ai.html"|g' "$file"
  sed -i 's|href="/products/heartguard-ai/"|href="/products-heartguard-ai.html"|g' "$file"
  sed -i 's|href="/products/homelandwatch7"|href="/products-homelandwatch7.html"|g' "$file"
  sed -i 's|href="/products/homelandwatch7/"|href="/products-homelandwatch7.html"|g' "$file"
}

# Update links in all HTML files
for html_file in "$OUT_DIR"/*.html; do
  if [ -f "$html_file" ]; then
    update_links "$html_file"
    echo "  Updated links in $(basename "$html_file")"
  fi
done

echo ""
echo "Post-processing complete!"
echo ""
echo "HTML files created:"
ls "$OUT_DIR"/*.html 2>/dev/null | wc -l
echo ""
echo "Ready for deployment!"
