# update-search.ps1 - THE ONLY SCRIPT YOU NEED
Write-Host "Updating search index..." -ForegroundColor Green

$output = @()
$posts = Get-ChildItem "content/posts" -Filter *.md | Where-Object { $_.Name -ne "_index.md" }

foreach ($post in $posts) {
    # Simple and reliable: use filename for title
    $title = $post.BaseName -replace '-', ' '
    $title = (Get-Culture).TextInfo.ToTitleCase($title)
    $slug = $post.BaseName.ToLower()
    
    # Simple description
    $description = "Read this post about $title"
    
    $item = @{
        title = $title
        url = "/posts/$slug/"
        content = $description
    }
    
    $output += $item
    Write-Host "Added: $title" -ForegroundColor Green
}

# Save as JSON
$output | ConvertTo-Json | Out-File "static/index.json" -Encoding UTF8
Write-Host "Search index updated with $($output.Count) posts!" -ForegroundColor Green
