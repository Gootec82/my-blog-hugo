---
date: 2025-08-06T16:00:00+01:00
draft: false
title: "How I Added a Search Bar to My Hugo Blog (Step-by-Step Guide)"
slug: "add-search-to-hugo"
description: "Learn how I added a fast, SEO-friendly search bar to my Hugo blog using Lunr.js and other tools. Includes code snippets, optimization tips, and SEO strategies."
image: "/images/searchhugo.webp"
imageBig: "/images/searchhugo.webp" 
imageAlt: "Search bar implementation on Hugo blog - code example and workflow"
categories: ["general", "tutorial", "AI", "web-development"]
tags: ["hugo", "search", "tutorial", "blog", "seo"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

## Introduction

When I built my Hugo blog, one big thing was missing: **a proper search bar**. Hugo is blazing fast and lightweight, but because it’s a static site generator, it doesn’t have a built-in search feature like WordPress or other CMS platforms.  

I wanted a search bar that worked well, boosted user experience, and helped me with **Google AdSense approval** and **SEO ranking**. After testing different tools, I finally got it working. In this post, I’ll share exactly how I did it—step by step—with the code I used.

---

## Why I Needed Search on My Hugo Blog

- **Better user experience**: Visitors can instantly find posts instead of clicking endlessly.  
- **Higher engagement**: Search keeps readers on my site longer, which is great for SEO.  
- **AdSense approval**: Google loves good site structure and navigation. A working search feature improves both.  
- **Professional look**: A blog with search feels more complete and trustworthy.  

---

## The Tools I Used

I tested multiple solutions, but I settled on **Lunr.js** for my implementation. Here’s why:

- Runs 100% client-side (no server needed).  
- Super fast—search results appear instantly.  
- Fully customizable.  
- Works offline once loaded.  

I also experimented with **Google Programmable Search** and **Pagefind**, but Lunr.js gave me the flexibility I wanted.

---

## Step 1: Generate a Search Index in Hugo

First, I created a `search.json` file that contains all my blog post data. I placed it inside my Hugo project at:

/layouts/_default/list.json


Here’s my Hugo template for generating the JSON index:

```go
{{- $.Scratch.Add "index" slice -}}
{{- range .Site.RegularPages -}}
  {{- $.Scratch.Add "index" (dict 
    "title" .Title
    "tags" .Params.tags
    "categories" .Params.categories
    "description" .Params.description
    "date" .Date.Format "2006-01-02"
    "url" .Permalink
    "content" .Plain
  ) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}
```

Now every time I build my site (hugo), it generates a search.json file containing all my posts.

Step 2: Add Lunr.js to My Hugo Blog

I added Lunr.js by placing it in my static/js/ folder. You can also load it via CDN:

<script src="https://cdn.jsdelivr.net/npm/lunr/lunr.min.js"></script>


Then I created my own search.js file:

```
let idx = null;
let store = {};

fetch("/search.json")
  .then(response => response.json())
  .then(data => {
    store = data;
    idx = lunr(function () {
      this.ref("url");
      this.field("title");
      this.field("tags");
      this.field("categories");
      this.field("description");
      this.field("content");

      data.forEach(doc => {
        this.add(doc);
      });
    });
  });

document.getElementById("searchBox").addEventListener("input", function () {
  let query = this.value;
  let results = idx.search(query);
  let resultsList = document.getElementById("results");
  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsList.innerHTML = "<p>No results found</p>";
  } else {
    results.forEach(result => {
      let item = store.find(post => post.url === result.ref);
      resultsList.innerHTML += `
        <div class="result">
          <a href="${item.url}"><h3>${item.title}</h3></a>
          <p>${item.description}</p>
        </div>
      `;
    });
  }
});
```

Step 3: Add the Search Bar to My Theme

I added a search box inside my header layout:

```
<div class="search-container">
  <input id="searchBox" type="text" placeholder="Search blog posts..." />
  <div id="results"></div>
</div>
<script src="/js/search.js"></script>


And styled it with CSS:

.search-container {
  position: relative;
  max-width: 500px;
  margin: 20px auto;
}

#searchBox {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 6px;
}

#results {
  margin-top: 10px;
}

.result {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
```

Step 4: SEO + AdSense Optimization

I optimized my search implementation for SEO ranking and Google AdSense approval:

Metadata indexing – I added descriptions, tags, and categories to my search.json.

Lazy loading – My search.js only loads when someone clicks the search box (to keep site speed fast).

Mobile-friendly – I tested my search bar on different devices.

Schema.org markup – I added structured data for better indexing. Example:

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://myhugoblog.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://myhugoblog.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

This tells Google that my site has a search feature, which helps with rich results.

Alternatives I Considered

Google Programmable Search → Easy setup, but it shows ads.

Algolia → Very powerful, but I didn’t want the monthly costs.

Pagefind → Simple setup, but I wanted more customization.

For me, Lunr.js was the perfect balance.

## Final Thoughts

Adding search to my Hugo blog was one of the best upgrades I’ve made. It:
✅ Improved navigation and user experience.
✅ Helped with SEO and Google AdSense approval.
✅ Made my blog feel more professional.


## Full Implementation on GitHub

If you’d like to see my complete implementation with all the code, styles, and setup instructions, I’ve uploaded everything to my GitHub repository:  

👉 [My Hugo Search Implementation](https://github.com/gootec82/my-blog-hugo)