---
date: 2025-09-20T16:00:00+01:00
draft: false
title: "Why I Noindexed My Tag and Author Pages in Hugo — A Step-by-Step SEO Fix"
slug: "noindex-hugo-tag-author-pages"
description: "Why I Noindexed my tag and author pages in Hugo, how I implemented the fix, and the SEO benefits."
image: "/images/noindex-hugo-fix.webp"
imageBig: "/images/noindex-hugo-fix.webp"
imageAlt: "Noindex SEO fix applied to Hugo blog tag and author pages in Google Search Console"
tags: ["Hugo", "general"]
categories: ["web-development"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---


# Why I Noindexed My Tag and Author Pages in Hugo — A Step-by-Step SEO Fix

Hey folks,  

If you’re running a **Hugo-based blog** (or really any site with taxonomy pages), this post is for you.  

I recently discovered that **Google was indexing my tag and author pages** — something I never intended. In this post, I’ll explain:  

- Why that’s a problem  
- How I diagnosed it  
- Exactly how I fixed it using Hugo templates  
- What benefits I’m already seeing  

---

## What I Found in Google Search Console  

During a routine check-in with **Google Search Console (GSC)**, I noticed something I hadn’t expected:  


URL » Last crawled
https://devviews.com/tags/adsense/
 » Sep 16, 2025
https://devviews.com/tags/custom-domain/
 » Sep 16, 2025
https://devviews.com/authors/
 » Already indexed



My `/tags/` and `/authors/` pages were being crawled — and in some cases, indexed.  

That might not sound like a big deal. But if you understand how **SEO** and **crawl budget** work, you know this can quickly become a problem.  

---

## Why Indexing Tag and Author Pages Is a Bad Idea  

Here’s the breakdown:  

### 1. Duplicate Content Issues  
Tag and author pages are usually just lists of post excerpts. That means they **reuse content** that already exists on your blog posts and homepage. Google penalizes sites with duplicate content across URLs because it makes it harder to decide which version to rank.  

### 2. Wasting Crawl Budget  
**Crawl budget** = the number of pages Googlebot will crawl on your site in a given period.  
If it wastes time on tag pages, it might not find your new posts or important updates as quickly.  

### 3. Thin Content = Low Value  
These pages rarely bring standalone value. People aren’t searching for `tags: adsense` — they’re searching for **“how to set up AdSense on WordPress.”** Sending users to a tag page is a poor experience.  

### 4. Diluted Link Equity  
Every internal link to a low-value tag page is a missed opportunity to pass **link equity** (“link juice”) to your important pages — articles, homepage, landing pages.  

> 🔍 **Reference:** [John Mueller (Google) has confirmed that tag pages should often be noindexed](https://www.seroundtable.com/google-tag-cloud-pages-thin-content-23793.html), especially for larger sites, to avoid self-competing and cannibalizing search traffic.  

---

## The Goal: Noindex Individual Pages, Keep Main Archives  

I still wanted:  

- ✅ `/tags/` → indexable (main tags overview)  
- ✅ `/authors/` → indexable (main authors page)  
- ✅ `/categories/` → indexable  

But **noindex** for individual archive pages:  

- ❌ `/tags/adsense/`  
- ❌ `/authors/Godfrey-Omoregie/`  
- ❌ `/categories/tutorials/`  

---

## How I Implemented the Fix in Hugo  

I added the following code to my `layouts/_default/baseof.html` file — right where other meta tags are defined:  

```go-html-template
{{ $shouldNoindex := false }}
{{ $url := strings.TrimSuffix "/" .RelPermalink }}

{{ if hasPrefix $url "/categories" }}{{ $shouldNoindex = true }}{{ end }}
{{ if hasPrefix $url "/authors" }}{{ $shouldNoindex = true }}{{ end }}
{{ if hasPrefix $url "/tags" }}{{ $shouldNoindex = true }}{{ end }}

{{ if $shouldNoindex }}
  <meta name="robots" content="noindex">
{{ else }}
  <meta name="robots" content="index, follow">
{{ end }}
```

Why This Code Works

Trims trailing slashes → ensures /tags and /tags/ are treated the same

Checks URL prefixes → catches any URL beginning with /tags, /authors, or /categories

Sets a variable → clean, extendable logic

One meta tag output → avoids duplicate meta tags

Testing the Implementation

I tested three scenarios:

https://devviews.com/tags/adsense/ → ✅ noindex

https://devviews.com/authors/ → ✅ index

https://devviews.com/articles/my-post/ → ✅ index

👉 I used View Source + Search for “noindex” to confirm results.

Expected SEO Benefits

✅ Cleaner sitemap and index status in GSC

✅ Better crawl efficiency

✅ Reduced duplicate content issues

✅ Improved focus on ranking my actual content

✅ Better user experience (visitors land on real posts, not list pages)

Lesson Learned

If you’re using Hugo, Jekyll, WordPress, or any platform that generates archive pages — check your Google Search Console. You might be surprised what’s being indexed.

A quick noindex fix can save you SEO headaches and help Google better understand your site’s structure.

👉 I’ll follow up in a few weeks with results on whether this improves my crawl rate and organic traffic.

💬 Let me know in the comments if you’ve run into something similar.

Happy coding! 🚀