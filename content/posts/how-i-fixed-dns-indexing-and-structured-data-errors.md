---
title: "How I Fixed DNS Errors, Indexing Issues, and Structured Data Problems After Launching My Hugo Blog"
date: 2025-09-17T08:00:00+00:00
slug: "how-i-fixed-dns-indexing-and-structured-data-errors"
draft: false
description: "Step-by-step solutions to DNS errors, Google indexing issues, and structured data problems I faced after launching my Hugo + Netlify blog."
image: "/images/blog-troubleshooting.png"
imageBig: "/images/blog-troubleshooting.png"
imageAlt: "developer fixing blog errors DNS indexing structured data"
categories: ["Web Development"]
tags: ["dns", "google-search-console", "seo", "hugo", "netlify"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

When I launched my blog, I thought the hardest part was over. I had already written about [how I built my first blog](https://devviews.com/posts/how-i-built-my-first-blog/) using Hugo and Netlify. But once it went live, I quickly discovered that the real challenge was keeping everything working smoothly.  

In this post, I’ll share three real problems I faced (and fixed):  

1. **DNS setup error – site not reachable after adding a custom domain.**  
2. **Google Search Console “Crawled – not indexed” issue.**  
3. **Unparsable structured data error in Google Search Console.**  

---

## Problem #1: How I Fixed “This Site Can’t Be Reached” (DNS Error After Adding a Domain)

After connecting my shiny new domain, I tried visiting my site and got this dreaded message:

> **This site can’t be reached.**

I assumed it was just DNS propagation and waited. Hours turned into days, and nothing changed. My blog felt invisible.

### The Cause
The issue was my DNS records in Namecheap. My setup looked like this:

- **A Record**  
  - `@` → `75.2.60.5`  
  - `@` → `99.83.190.102`  

- **CNAME Record**  
  - `www` → `devview.netlify.app.`  

- **TXT Record**  
  - Google site verification  

The problem? Two **A records** for the root domain (`@`). DNS didn’t know which one to use, so my site broke.

### The Fix
I deleted the extra A record and kept just one:


A Record
@ 75.2.60.5



The CNAME and TXT records stayed the same.

After a few hours, my site worked perfectly on the new domain.

✅ **Lesson learned:** Always double-check DNS. One wrong record can make your site unreachable.

---

## Problem #2: Fixing Google Search Console “Crawled – Not Indexed”

When I checked Google Search Console, I noticed three key pages—**Contact, About, and Privacy Policy**—were marked as:

> **Crawled – not indexed**

Google had seen the pages but decided not to include them in search results. That was frustrating.

### Why It Happened
Pages like **Contact** or **Privacy** are often too thin or generic. Mine didn’t offer much, so Google didn’t see them as valuable enough to index.

### The Fix
I improved each page to make them more useful.

#### 1. Privacy Policy: Added a Plain-English Summary
Instead of only legal text, I added a simple intro with bullet points:

- We only collect what’s necessary (comments, analytics).  
- We don’t sell user data.  
- You can request to see or delete your data anytime.  
- We use trusted third-party tools like Google Analytics and Utterances.  

This gave visitors something meaningful right at the top.

#### 2. Internal Links to the Contact Page
Inside the Privacy Policy, I added links to the Contact page:

- In the intro: *“If you have any questions, reach out [here](https://devviews.com/contact).”*  
- In the “Your Rights” section: *“To exercise these rights, [contact us](https://devviews.com/contact).”*  

This improved site structure and helped Google connect the pages.

#### 3. About Page: Added Structured Data
I added `AboutPage` schema in JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Person",
    "name": "Godfrey O. Omoregie",
    "jobTitle": "Software Developer & Technical Blogger",
    "url": "https://devviews.com/about",
    "image": "https://devviews.com/images/author.webp",
    "sameAs": [
      "https://github.com/gootec82",
      "https://x.com/godfreycode1"
    ],
    "description": "Software Developer, Technical Blogger and Problem Solver."
  },
  "publisher": {
    "@type": "Organization",
    "name": "DevViews",
    "url": "https://devviews.com",
    "logo": "https://devviews.com/images/logo.png"
  }
}
```

A few weeks later, Google indexed all three pages.

✅ Lesson learned: Even “boring” pages deserve effort. Write them for humans, not just checkboxes.

Problem #3: Solving Google Search Console “Unparsable Structured Data” Error

Just as things were running smoothly, I woke up to an email:

Unparsable structured data issues detected.

I immediately thought: Uh oh, did I break SEO completely?

The Cause

Google flagged my About page’s structured data because of a trailing comma in the JSON.

Here’s the broken code:


"sameAs": [
  "https://github.com/gootec82",
  "https://x.com/godfreycode1", // ← Trailing comma
],


That one comma made the entire block invalid.

The Fix

I removed the comma:


"sameAs": [
  "https://github.com/gootec82",
  "https://x.com/godfreycode1"
]


Then I tested the page in Google’s Rich Results Test, and everything passed.

✅ Lesson learned: JSON doesn’t allow trailing commas. Always validate before you publish.


Final Thoughts: Blogging is Debugging Too

Here’s what these issues taught me:

DNS mistakes can bring down your entire site.

Thin content won’t get indexed—make every page valuable.

A single misplaced character in JSON can break structured data.

Running a blog as a developer is more than writing posts. It’s debugging your own platform and learning from every hiccup.

If you’re just starting out, check out how I built my first blog
 for the setup details. Then keep this post handy for when the real-world problems show up.

Blogging is part writing, part coding, part troubleshooting. And honestly? That’s the fun of it.