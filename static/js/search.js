// search.js - SIMPLE BUT RELIABLE
console.log("🔍 Search initialized");

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.log("Search elements not found");
        return;
    }
    
    let allPosts = [];
    
    // Load search data
    fetch('/index.json')
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;
            console.log(`✅ Loaded ${posts.length} posts with categories and tags`);
            console.log("Sample post:", posts[0]);
        });
    
    // Simple search function
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (query.length < 2) return;
        
        console.log("Searching for:", query);
        
        // Search through ALL fields
        const results = allPosts.filter(post => {
            const titleMatch = post.title && post.title.toLowerCase().includes(query);
            const categoryMatch = post.categories && post.categories.some(cat => 
                cat.toLowerCase().includes(query)
            );
            const tagMatch = post.tags && post.tags.some(tag => 
                tag.toLowerCase().includes(query)
            );
            const contentMatch = post.content && post.content.toLowerCase().includes(query);
            const allTextMatch = post.allText && post.allText.toLowerCase().includes(query);
            
            return titleMatch || categoryMatch || tagMatch || contentMatch || allTextMatch;
        });
        
        console.log("Found results:", results.length);
        
        // Display results
        if (results.length === 0) {
            searchResults.innerHTML = '<li class="no-results">No results found</li>';
        } else {
            results.forEach(post => {
                const li = document.createElement('li');
                
                // Show categories and tags
                const catInfo = post.categories && post.categories.length > 0 ? 
                    `<br>📁 <small>Categories: ${post.categories.join(', ')}</small>` : '';
                
                const tagInfo = post.tags && post.tags.length > 0 ? 
                    `<br>🏷️ <small>Tags: ${post.tags.join(', ')}</small>` : '';
                
                li.innerHTML = `
                    <a href="${post.url}">
                        <strong>${post.title}</strong>
                        ${catInfo}
                        ${tagInfo}
                    </a>
                `;
                searchResults.appendChild(li);
            });
        }
        
        searchResults.style.display = 'block';
    });
});