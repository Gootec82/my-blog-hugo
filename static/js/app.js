const mode = localStorage.getItem("mode") || "";
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

document.body.className = mode;

toggle.addEventListener("click", ()=>{
  localStorage.setItem("mode", mode === "light" ? "" : "light")
  body.classList.toggle("light")
})

/*
// ===== SIMPLE NO-LIBRARY SEARCH =====
console.log("🔍 Simple search initialized");

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let allPosts = [];
    
    // Load search data
    fetch('/index.json')
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;
            console.log(`✅ Loaded ${posts.length} posts`);
            searchInput.placeholder = "Search posts...";
        });
    
    // Simple search function
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        
        if (query.length < 2) return;
        
        // Filter posts that match query
        const results = allPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.content.toLowerCase().includes(query)
        );
        
        // Display results
        if (results.length === 0) {
            searchResults.innerHTML = '<li class="no-results">No results found</li>';
        } else {
            results.forEach(post => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
                searchResults.appendChild(li);
            });
        }
        
        searchResults.style.display = 'block';
    });
});

// ADD THIS DEBUG CODE AT THE TOP OF YOUR app.js
console.log("=== SEARCH DEBUG ===");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - testing search...");
    
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) {
        console.error("❌ search-input element not found");
        return;
    }
    if (!searchResults) {
        console.error("❌ search-results element not found");
        return;
    }
    console.log("✅ HTML elements found");
    
    // Test the JSON fetch
    fetch('/index.json')
        .then(response => {
            console.log("📦 JSON response status:", response.status);
            if (!response.ok) throw new Error('HTTP error ' + response.status);
            return response.json();
        })
        .then(data => {
            console.log("✅ JSON loaded successfully!");
            console.log("Number of posts:", data.length);
            console.log("First post:", data[0]);
            
            // Test a simple search
            const testQuery = "first";
            const results = data.filter(post => 
                post.title.toLowerCase().includes(testQuery)
            );
            console.log(`Test search for "${testQuery}":`, results.length, "results");
            
        })
        .catch(error => {
            console.error("❌ Fetch error:", error);
        });
});

// Add this RIGHT AFTER searchResults.style.display = 'block';
console.log("🔴 DEBUG: Results should be visible NOW");
console.log("Number of results:", results.length);
searchResults.style.border = "3px solid red"; // Make it visible with red border
searchResults.style.background = "#fffcef"; // Light yellow background

// Also log what you're typing
console.log("Current search query:", query);*/