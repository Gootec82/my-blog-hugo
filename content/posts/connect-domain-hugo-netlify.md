---
title: "How I Connected My Custom Domain to My Hugo Blog on Netlify (Step-by-Step Guide + Common Errors to Avoid)"
slug: "connect-domain-hugo-netlify"
date: 2025-09-08T18:00:00+01:00
description: "Learn exactly how I connected my custom domain to my Hugo blog on Netlify, fixed common errors, enabled SSL, and prepared my site for Google Search Console and AdSense approval."
tags: ["Hugo", "Netlify", "Custom Domain", "SEO", "AdSense"]
categories: ["web-development"]
draft: false
image: "/images/analytics-hugo-lg.jpg"
imageBig: "/images/analytics-hugo-lg.jpg"
imageAlt: " A domain image showing .com"
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

# How I Connected My Custom Domain to My Hugo Blog on Netlify (Step-by-Step Guide + Common Errors to Avoid)

Hello, fellow developers! 👋  

If you’re running a Hugo blog and want to take it to the next level with a **professional custom domain**, you’ve probably wondered how to make it work seamlessly on Netlify. Recently, I went through the entire process with my own blog, and I want to share my experience with you — **every step, every common error, and every fix** I encountered along the way.  

By the end of this post, you’ll have your Hugo blog ready for **Google Search Console indexing** and **Google AdSense approval**. Let’s dive in!

---

## Step 1: Buy Your Domain

The first step is to purchase a custom domain. I used **Namecheap**, but any domain registrar works.  

When you buy a domain, it usually comes with **default DNS settings**, such as Namecheap’s BasicDNS. These default records may need to be removed or replaced when connecting to Netlify.  

---

## Step 2: Add Your Domain to Netlify

1. Open your Netlify dashboard.  
2. Go to **Domain Management → Add Custom Domain**.  
3. Enter your purchased domain (e.g., `devviews.com`).  
4. Netlify will attempt to verify your ownership. At this stage, you may see:


Don’t worry — this is normal. It simply means that your domain’s DNS records haven’t fully propagated yet.

---

## Step 3: Configure DNS Records

For Namecheap:  

1. Go to your **Advanced DNS settings**.  
2. Remove any default **parking or redirect records**.  
3. Add the following **correct DNS records** exactly as shown:

| Type  | Host | Value               | TTL       |
| ----- | ---- | ------------------- | --------- |
| A     | @    | 75.2.60.5           | Automatic |
| A     | @    | 99.83.190.102       | Automatic |
| CNAME | www  | devview.netlify.app | Automatic |

- The **A records** point your root domain (`devviews.com`) to Netlify’s servers.  
- The **CNAME record** ensures that `www.devviews.com` redirects to your Netlify-hosted site.  

⚠️ Common issue: Leaving old parking or redirect records can cause your site to be unreachable or slow. Always remove these before adding new records.

---

## Step 4: Enable SSL/HTTPS

Netlify provides free **Let’s Encrypt certificates**.  

- Go to **Domain Management → HTTPS**.  
- Click **Enable Automatic HTTPS**.  
- Wait a few hours for DNS propagation to complete.  

⚠️ Error you might see: “SSL/TLS certificate could not be provisioned.”  
- Cause: DNS has not fully propagated to all servers.  
- Fix: Wait a few hours and click **Renew certificate** if needed.

---

## Step 5: Update Your Hugo Configuration

Open your Hugo `config.toml` file and make sure it contains:

```toml
baseURL = "https://devviews.com/"
enableRobotsTXT = true
```

Why this matters:

baseURL ensures all URLs in your sitemap and internal links point to your custom domain.

enableRobotsTXT = true generates a robots.txt file, telling search engines which pages to crawl.

⚠️ Mistake to avoid: Not setting the correct baseURL or disabling sitemap generation — this can break Google indexing.

Step 6: Build Your Hugo Site Locally

Open your project folder in Command Prompt or PowerShell.

Run:

hugo


Check the public/ folder. You should see:

index.html
sitemap.xml
robots.txt


Open sitemap.xml locally in your browser:

file:///C:/Users/USER/Desktop/my-blog-hugo/public/sitemap.xml


You should see all your posts, pages, and tags listed in XML format, like this:

```
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devviews.com/</loc>
    <lastmod>2025-09-08T10:00:00+00:00</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://devviews.com/blog/first-post/</loc>
    <lastmod>2025-09-08T10:00:00+00:00</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

⚠️ If sitemap.xml is missing, check your Hugo disableKinds setting — make sure "sitemap" is not disabled.

Step 7: Submit Your Sitemap to Google Search Console

Go to Google Search Console
.

Add your domain property (devviews.com).

Verify ownership by adding the TXT record Google provides to Namecheap DNS.

Go to Sitemaps → Add a new sitemap. Enter:  sitemap.xml

Google will read it as https://devviews.com/sitemap.xml.

If DNS propagation is not complete, you might see temporary errors. This is normal — just resubmit after a few hours.

Step 8: Common Errors & How to Fix Them
Error	Cause	Fix
SSL not issued	DNS not propagated	Wait 1–24 hours, retry SSL certificate
Sitemap not found	Hugo config missing baseURL or sitemap disabled	Add baseURL and ensure sitemap is not in disableKinds
Site slow or unreachable	DNS caching / propagation	Wait for global DNS propagation
Ownership verification failed	TXT record missing	Add Google-provided TXT to Namecheap DNS
Step 9: Optimize for SEO and AdSense

```
Ensure each post has a descriptive <title> and <meta description>.
```

Use canonical URLs to prevent duplicate content issues.

Keep your sitemap updated whenever you add new posts.

Enable robots.txt to guide Google crawlers effectively.

✅ Final Thoughts

Connecting a custom domain to your Hugo blog on Netlify is straightforward, but small mistakes in DNS or Hugo configuration can prevent Google from indexing your site.

By following the steps above:

Your blog will have a professional custom domain

SSL will be active for secure browsing

Your sitemap and robots.txt will guide Google crawling

Your site will be ready for AdSense approval

Godfrey’s tip 💡: Always check your site in incognito mode after making DNS changes — it’s the fastest way to see what Google sees.