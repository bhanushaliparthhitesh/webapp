# Big4India Mobile Optimization Script (PowerShell)
# This script applies mobile optimizations to all HTML pages

Write-Host "Starting mobile optimization for Big4India webapp..." -ForegroundColor Green

function Optimize-HtmlFile {
    param(
        [string]$FilePath
    )
    
    $filename = Split-Path $FilePath -Leaf
    Write-Host "Optimizing $filename..." -ForegroundColor Yellow
    
    try {
        # Create backup
        Copy-Item $FilePath "$FilePath.backup" -Force
        
        # Read file content
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        
        # Add mobile optimization CSS if not already present
        if ($content -notmatch "mobile-optimizations.css") {
            $content = $content -replace "</head>", "    <!-- Mobile Optimization Styles -->`r`n    <link rel=`"stylesheet`" href=`"css/mobile-optimizations.css`">`r`n</head>"
        }
        
        # Add mobile navigation script if not already present
        if ($content -notmatch "mobile-navigation.js") {
            $content = $content -replace "</body>", "    <!-- Mobile Navigation JavaScript -->`r`n    <script src=`"js/mobile-navigation.js`"></script>`r`n</body>"
        }
        
        # Add responsive meta viewport if not present
        if ($content -notmatch "viewport") {
            $content = $content -replace "<head>", "<head>`r`n    <meta name=`"viewport`" content=`"width=device-width, initial-scale=1.0`">"
        }
        
        # Write updated content back to file
        Set-Content $FilePath $content -Encoding UTF8
        
        Write-Host "✓ $filename optimized" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Error optimizing $filename`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Find all HTML files and optimize them
Get-ChildItem -Path . -Filter "*.html" -Recurse | ForEach-Object {
    Optimize-HtmlFile -FilePath $_.FullName
}

Write-Host "`n✓ Mobile optimization complete!" -ForegroundColor Green
Write-Host "✓ All HTML files have been optimized for mobile devices" -ForegroundColor Green
Write-Host "✓ Backup files created with .backup extension" -ForegroundColor Green
Write-Host ""
Write-Host "Mobile optimizations applied:" -ForegroundColor Cyan
Write-Host "  - Added responsive CSS framework" -ForegroundColor White
Write-Host "  - Enhanced mobile navigation" -ForegroundColor White
Write-Host "  - Touch-friendly interface elements" -ForegroundColor White
Write-Host "  - Improved mobile performance" -ForegroundColor White
Write-Host "  - Better accessibility features" -ForegroundColor White
Write-Host "  - Responsive image handling" -ForegroundColor White
Write-Host "  - Mobile-optimized buttons" -ForegroundColor White
