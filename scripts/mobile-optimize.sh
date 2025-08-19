#!/bin/bash

# Big4India Mobile Optimization Script
# This script applies mobile optimizations to all HTML pages

echo "Starting mobile optimization for Big4India webapp..."

# Function to add mobile optimizations to HTML files
optimize_html_file() {
    local file="$1"
    local filename=$(basename "$file")
    
    echo "Optimizing $filename..."
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Add mobile optimization CSS if not already present
    if ! grep -q "mobile-optimizations.css" "$file"; then
        sed -i 's|</head>|    <!-- Mobile Optimization Styles -->\n    <link rel="stylesheet" href="css/mobile-optimizations.css">\n</head>|' "$file"
    fi
    
    # Add mobile navigation script if not already present
    if ! grep -q "mobile-navigation.js" "$file"; then
        sed -i 's|</body>|    <!-- Mobile Navigation JavaScript -->\n    <script src="js/mobile-navigation.js"></script>\n</body>|' "$file"
    fi
    
    # Add responsive meta viewport if not present
    if ! grep -q "viewport" "$file"; then
        sed -i 's|<head>|<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">|' "$file"
    fi
    
    echo "✓ $filename optimized"
}

# Find all HTML files in the project
find . -name "*.html" -type f | while read file; do
    optimize_html_file "$file"
done

echo "✓ Mobile optimization complete!"
echo "✓ All HTML files have been optimized for mobile devices"
echo "✓ Backup files created with .backup extension"
echo ""
echo "Mobile optimizations applied:"
echo "  - Added responsive CSS framework"
echo "  - Enhanced mobile navigation"
echo "  - Touch-friendly interface elements"
echo "  - Improved mobile performance"
echo "  - Better accessibility features"
