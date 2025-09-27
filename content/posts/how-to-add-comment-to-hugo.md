---
title: "How I Added Comments to My Hugo Blog (With Utterances)"
slug: "how-to-add-comment-to-hugo"
description: "How I implemented a GitHub-powered comment system on my Hugo blog using Utterances, step-by-step with code and SEO best practices."
date: 2025-08-14T16:34:06+01:00
draft: false
image: "/images/utterances-comments-hugo-blog.webp"
imageBig: "/images/utterances-comments-hugo-blog.webp"
imageAlt: "Hugo blog with comments section implementation"
categories: ["Web Development", "Hugo", "general"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

# How I Added Comments to My Hugo Blog (With Utterances)

When I finished building my Hugo blog, one thing was still missing: **a way for readers to leave comments**. Hugo is fast and lightweight, but since it's a static site generator, it doesn't include a built-in comment system like WordPress.

In this comprehensive guide, I'll walk you through exactly how **I added comments to my Hugo blog using Utterances**, with clear separation between explanations and code examples.

---

## Why Comments Matter for a Static Blog

Before we dive into the technical implementation, let me share why I believe comments are essential:

- **Reader Engagement** → Creates two-way conversations
- **SEO Value** → Fresh user-generated content helps rankings  
- **Community Building** → Transforms your blog into a hub
- **Valuable Feedback** → Understand what readers want
- **Trust Building** → Shows real engagement to new visitors

---

## My Comment System Evaluation Process

I tested several comment systems before settling on Utterances. Here's my analysis:

### Disqus - The Traditional Choice

**The Code:**
```
<div id="disqus_thread"></div>
<script>
var disqus_config = function () {
  this.page.url = "{{ .Permalink }}";
  this.page.identifier = "{{ .File.Path }}";
};
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://YOUR-SHORTNAME.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
</script>
```

Why I Didn't Choose Disqus:

🚫 Shows ads unless you pay for premium

🚫 Heavy tracking and privacy concerns

🚫 Slows down page loading significantly

🚫 Complex moderation interface

Giscus - GitHub Discussions Alternative
The Code:

```
<script src="https://giscus.app/client.js"
        data-repo="gootec82/my-blog-hugo"
        data-repo-id="YOUR_REPO_ID"
        data-category="General"
        data-category-id="YOUR_CATEGORY_ID"
        data-mapping="pathname"
        data-theme="light"
        crossorigin="anonymous"
        async>
</script>
```

Giscus Pros:

✅ Threaded replies and nested comments

✅ Emoji reactions support

✅ GitHub Discussions backend

Why I Didn't Choose Giscus:

⚠️ More complex setup process

⚠️ Requires additional repository configuration

Utterances - The Winner for Me
I ultimately chose Utterances because:

✅ Completely free - no hidden costs

✅ No tracking - privacy-focused

✅ Lightweight - minimal performance impact

✅ GitHub integration - familiar interface

✅ Easy moderation - through GitHub issues

✅ Open source - transparent codebase

Step-by-Step Implementation Guide
1. GitHub Repository Setup
First, ensure your blog's source code is in a public GitHub repository. Utterances requires this because it uses GitHub Issues for storing comments.

Requirements:

Repository must be public

Utterances app needs access

GitHub Issues must be enabled

2. Installing Utterances App
Install the Utterances app on your GitHub account:

Visit github.com/apps/utterances

Click "Install"

Select your blog's repository

Grant necessary permissions

3. Hugo Template Implementation
Add this code to your layouts/_default/single.html file:

```
<!-- Comments Section -->
<div class="comments-section">
    <h2 class="comments-title">Comments & Discussion</h2>
    <p class="comments-notice">
        Join the conversation using your GitHub account. Comments are powered by Utterances.
    </p>

    <script src="https://utteranc.es/client.js"
            repo="gootec82/my-blog-hugo"
            issue-term="title"
            theme="github-light"
            crossorigin="anonymous"
            async>
    </script>

    <noscript>
        <p class="comments-noscript">
            Please enable JavaScript to view comments.
        </p>
    </noscript>
</div>
4. CSS Styling for Comments
Add this CSS to make comments blend with your design:

css
/* Comments Section Styling */
.comments-section {
    margin: 3rem 0;
    padding: 2rem 0;
    border-top: 1px solid #eaeaea;
}

.comments-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    font-weight: 600;
}

.comments-notice {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.comments-noscript {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    color: #6c757d;
    border: 1px solid #e9ecef;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .comments-section {
        border-top-color: #2d3748;
    }
    
    .comments-notice {
        color: #a0aec0;
    }
    
    .comments-noscript {
        background: #2d3748;
        border-color: #4a5568;
        color: #cbd5e0;
    }
}
```

5. Dynamic Theme Configuration
For automatic dark/light mode handling:

```
<script src="https://utteranc.es/client.js"
        repo="gootec82/my-blog-hugo"
        issue-term="title"
        theme="{{ if eq .Site.Params.defaultTheme "dark" }}github-dark{{ else }}github-light{{ end }}"
        crossorigin="anonymous"
        async>
</script>
```

Advanced Configuration Options
Multiple Theme Options

```
<script src="https://utteranc.es/client.js"
        repo="gootec82/my-blog-hugo"
        issue-term="title"
        theme="github-dark-orange"
        crossorigin="anonymous"
        async>
</script>
```

Available themes: github-light, github-dark, preferred-color-scheme, github-dark-orange, icy-dark, dark-blue, photon-dark

Custom Issue Mapping

```
<script src="https://utteranc.es/client.js"
        repo="gootec82/my-blog-hugo"
        issue-term="pathname"
        crossorigin="anonymous"
        async>
</script>
```

Mapping options: pathname, url, title, og:title, specific term

Performance Impact Analysis
Before Utterances:

Lighthouse Score: 100

Load Time: 1.2s

Page Size: 450KB

After Utterances:

Lighthouse Score: 98

Load Time: 1.4s

Page Size: 480KB

Minimal impact thanks to:

✅ Async loading

✅ No render-blocking resources

✅ Lightweight script (30KB)


SEO Best Practices

1. Schema.org Markup

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DiscussionForumPosting",
  "headline": "{{ .Title }}",
  "author": {
    "@type": "Person",
    "name": "{{ .Params.authors }}",
    "url": "{{ .Site.BaseURL }}"
  },
  "commentCount": "0",
  "publisher": {
    "@type": "Organization",
    "name": "{{ .Site.Title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ .Site.BaseURL }}images/logo.webp"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ .Permalink }}"
  }
}
</script>


2.
Accessibility Features
<noscript>fallback for JavaScript-disabled users

Proper color contrast ratios

Keyboard navigation support

ARIA labels where appropriate
```

3. Performance Optimization
Async script loading

Lazy loading implementation

Minimal CSS overhead

No external dependencies

Troubleshooting Common Issues
Issue 1: Comments Not Showing
Problem: Empty comments section
Solution: Verify repository is public, Utterances app installed, GitHub Issues enabled

Issue 2: Theme Mismatch
Problem: Wrong theme colors
Solution: Implement dynamic theme switching

Issue 3: Loading Performance
Problem: Slow page loading
Solution: Ensure async loading, implement lazy loading

Issue 4: Mobile Responsiveness
Problem: Broken UI on mobile
Solution: Add responsive CSS, test on multiple devices

Moderation and Management
Comment Moderation Workflow:

New comments appear as GitHub issues

Email notifications for new comments

Reply through GitHub interface

Close resolved discussions

Pin important conversations

Spam Prevention:

GitHub's built-in spam detection

Manual moderation

Conversation locking

User blocking

Comparison Table
Feature	Utterances	Disqus	Giscus	Commento
Cost	Free	Freemium	Free	Paid
Privacy	Excellent	Poor	Good	Excellent
Performance	Excellent	Poor	Good	Excellent
Setup	Easy	Easy	Medium	Medium
Moderation	GitHub Issues	Web Interface	GitHub Discussions	Web Interface
Customization	Medium	High	Medium	High
Future Enhancements
Automated comment import from previous systems

Comment reactions and voting system

Email notifications for comment replies

Comment analytics and engagement metrics

Integration with newsletter system

Final Thoughts
What I Love:
✅ Zero cost - completely free

✅ Excellent performance - minimal impact

✅ Great moderation - familiar GitHub interface

✅ Privacy focused - no tracking

✅ Reliable - no downtime

Considerations:
⚠️ GitHub account required - limits some readers

⚠️ Limited customization - compared to paid options

⚠️ No native notifications - relies on GitHub

My Recommendation:
If your audience is technical or comfortable with GitHub, Utterances is perfect. The simplicity, performance, and cost make it ideal for most static sites.

Implementation Checklist
Ensure Hugo site in public GitHub repository

Install Utterances app on repository

Add code to single.html template

Customize CSS to match theme

Test light/dark modes

Verify mobile responsiveness

Add schema markup for SEO

Test comment functionality

I'd love to hear about your experience with blog comments! Have you tried Utterances or other systems? What worked well and what challenges did you face?

Let me know in the comments below - powered by the very system I described!

PS:[👉 Check out my Hugo blog repository for the complete implementation code!](https://github.com/gootec82/my-blog-hugo)