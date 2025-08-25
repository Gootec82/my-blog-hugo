// Enhanced Search - Includes Titles, Categories, and Tags
console.log("🔍 Enhanced search initialized - Now with categories and tags!");

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.log("Search elements not found");
        return;
    }
    
    let searchData = [];
    
    // Load search data
    fetch('/index.json')
        .then(response => response.json())
        .then(posts => {
            searchData = posts;
            console.log(`✅ Loaded ${posts.length} posts with categories and tags`);
        })
        .catch(error => {
            console.log("Error loading search data:", error);
            searchResults.innerHTML = '<div class="no-results">Search data not available</div>';
        });
    
    // Enhanced search function
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        // Minimum 3 characters
        if (query.length < 3) return;
        
        if (searchData.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Loading search data...</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        console.log("Searching for:", query);
        
        // Search through TITLES, CATEGORIES, and TAGS
        const results = searchData.filter(post => {
            // 1. Search in TITLE
            const titleMatch = post.title && post.title.toLowerCase().includes(query);
            
            // 2. Search in CATEGORIES
            const categoryMatch = post.categories && post.categories.some(cat => 
                cat.toLowerCase().includes(query)
            );
            
            // 3. Search in TAGS  
            const tagMatch = post.tags && post.tags.some(tag => 
                tag.toLowerCase().includes(query)
            );
            
            // 4. Search in CONTENT (optional)
            const contentMatch = post.content && post.content.toLowerCase().includes(query);
            
            return titleMatch || categoryMatch || tagMatch || contentMatch;
        });
        
        console.log("Found results:", results.length);
        
        // Display results with category/tag info
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            results.forEach(post => {
                const div = document.createElement('div');
                div.className = 'search-result';
                
                // Fix URL issues
                let postUrl = post.permalink || post.url || '';
                postUrl = postUrl.replace(/\/$/, '');
                
                // Show categories and tags in results
                const categoriesInfo = post.categories && post.categories.length > 0 ? 
                    `<div class="search-meta">📁 ${post.categories.join(', ')}</div>` : '';
                
                const tagsInfo = post.tags && post.tags.length > 0 ? 
                    `<div class="search-meta">🏷️ ${post.tags.join(', ')}</div>` : '';
                
                div.innerHTML = `
                    <a href="${postUrl}" class="search-result-link">
                        <h4>${post.title}</h4>
                        ${post.description ? `<p class="search-desc">${post.description}</p>` : ''}
                        ${categoriesInfo}
                        ${tagsInfo}
                    </a>
                `;
                searchResults.appendChild(div);
            });
        }
        
        searchResults.style.display = 'block';
    });
});