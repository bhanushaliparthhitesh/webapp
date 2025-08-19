Write-Host "Starting mobile optimization..." -ForegroundColor Green

$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..." -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "mobile-optimizations.css") {
        Write-Host "  Already optimized" -ForegroundColor Gray
        continue
    }
    
    Copy-Item $file.FullName "$($file.FullName).backup"
    
    $content = $content -replace "</head>", "    <link rel=`"stylesheet`" href=`"css/mobile-optimizations.css`">`r`n</head>"
    $content = $content -replace "</body>", "    <script src=`"js/mobile-navigation.js`"></script>`r`n</body>"
    
    Set-Content $file.FullName $content -Encoding UTF8
    
    Write-Host "  Optimized successfully" -ForegroundColor Green
}

Write-Host "Mobile optimization complete!" -ForegroundColor Green
