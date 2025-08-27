// Production Search - Fixed URLs & Debugging
console.log("🔍 Production search initialized");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing production search");
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.error("Search elements not found");
        return;
    }
    
    let searchData = [];
    
    // Load search data with production URL
    const jsonUrl = window.location.origin + '/index.json';
    console.log("Fetching search index from:", jsonUrl);
    
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        })
        .then(posts => {
            console.log(`✅ Loaded ${posts.length} posts for search`);
            searchData = posts;
            
            // Log first post for verification
            if (posts.length > 0) {
                console.log("Sample post URL:", {
                    title: posts[0].title,
                    originalUrl: posts[0].permalink,
                    fixedUrl: window.location.origin + fixPostUrl(posts[0].permalink)
                });
            }
        })
        .catch(error => {
            console.error("Error loading search data:", error);
            searchResults.innerHTML = '<div class="no-results">Search temporarily unavailable</div>';
        });
    
    // Function to fix post URLs
    function fixPostUrl(url) {
        if (!url) return '/';
        
        let fixedUrl = url;
        
        // Ensure starts with slash
        if (!fixedUrl.startsWith('/')) {
            fixedUrl = '/' + fixedUrl;
        }
        
        // Ensure ends with slash for Hugo posts
        if (!fixedUrl.endsWith('/') && !fixedUrl.includes('.')) {
            fixedUrl = fixedUrl + '/';
        }
        
        return fixedUrl;
    }
    
    // Search function
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (query.length < 3) return;
        
        if (searchData.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Loading search data...</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        const results = searchData.filter(post => {
            const titleMatch = post.title && post.title.toLowerCase().includes(query);
            const contentMatch = post.content && post.content.toLowerCase().includes(query);
            return titleMatch || contentMatch;
        });
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            results.forEach(post => {
                const div = document.createElement('div');
                div.className = 'search-result';
                
                // FIXED URL GENERATION
                const fixedUrl = fixPostUrl(post.permalink || post.url);
                const absoluteUrl = window.location.origin + fixedUrl;
                
                div.innerHTML = `
                    <a href="${absoluteUrl}" class="search-result-link">
                        <h4>${post.title}</h4>
                        ${post.description ? `<p class="search-desc">${post.description}</p>` : ''}
                    </a>
                `;
                searchResults.appendChild(div);
            });
        }
        
        searchResults.style.display = 'block';
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Debug function to test URLs
    window.debugSearchUrls = function() {
        console.log("=== SEARCH URL DEBUG ===");
        console.log("Window origin:", window.location.origin);
        
        if (searchData.length > 0) {
            searchData.slice(0, 3).forEach((post, index) => {
                const fixedUrl = fixPostUrl(post.permalink);
                const absoluteUrl = window.location.origin + fixedUrl;
                console.log(`Post ${index + 1}:`, {
                    title: post.title,
                    original: post.permalink,
                    fixed: fixedUrl,
                    absolute: absoluteUrl
                });
            });
        }
    };
});

// Run debug function automatically in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(() => {
        if (typeof window.debugSearchUrls === 'function') {
            window.debugSearchUrls();
        }
    }, 3000);
}