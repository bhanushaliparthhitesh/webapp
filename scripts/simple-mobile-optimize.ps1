# Simple Mobile Optimization Script for Big4India
Write-Host "Starting mobile optimization..." -ForegroundColor Green

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..." -ForegroundColor Yellow
    
    # Read content
    $content = Get-Content $file.FullName -Raw
    
    # Skip if already optimized
    if ($content -match "mobile-optimizations.css") {
        Write-Host "  Already optimized, skipping..." -ForegroundColor Gray
        continue
    }
    
    # Create backup
    Copy-Item $file.FullName "$($file.FullName).backup"
    
    # Add CSS if missing
    if ($content -notmatch "mobile-optimizations.css") {
        $content = $content -replace "</head>", "    <link rel=`"stylesheet`" href=`"css/mobile-optimizations.css`">`r`n</head>"
    }
    
    # Add JS if missing
    if ($content -notmatch "mobile-navigation.js") {
        $content = $content -replace "</body>", "    <script src=`"js/mobile-navigation.js`"></script>`r`n</body>"
    }
    
    # Save changes
    Set-Content $file.FullName $content -Encoding UTF8
    
    Write-Host "  ✓ Optimized" -ForegroundColor Green
}

Write-Host "`nMobile optimization complete!" -ForegroundColor Green
