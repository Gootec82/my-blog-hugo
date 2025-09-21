---
title: "How I Built My First Blog"
date: 2025-09-01T08:00:00+00:00
draft: false
description: "The story of how I built my developer blog, DevView, from scratch using Hugo, Netlify, and AI as my co-pilot."
image: "/images/blogimage.webp"
imageBig: "/images/how_i_built_myhugo_image.webp"
imageAlt: "A screenshot of my Hugo blog showing the clean design and footer"
categories: ["webdev", "tutorial", "general", "beginners", "hugo", ]
tags: ["hugo", "netlify", "ai", "webdev", "javascript", "static-site", "blogging"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

# How I Built My First Blog

I'm incredibly excited to finally share my first developer blog, **DevViews**! 🎉  
This project was born from my desire to have a space I truly own. I didn't just want to write on someone else's platform — I wanted to build something that was **mine** from the ground up.

I had accounts on platforms like **Hashnode** and **Medium**, but deep down, I craved the freedom of controlling my own site, customizing everything, and learning along the way. That's why I chose to build with **Hugo**, a static site generator that's blazingly fast and developer-friendly.

I could have gone with Next.js or another framework, but I wanted to challenge myself with something new. Hugo felt lightweight, secure, and ideal for my first independent project. For hosting, **Netlify** was a no-brainer — it just works, and the integration with Git is seamless.

But let me be real: the journey wasn't smooth sailing. I hit walls, got stuck, almost gave up… and came out stronger. Here's how it all unfolded.

---

## Why I Chose Hugo Over Other Options

When deciding on a technology stack, I evaluated several options:

**WordPress:** Too heavy for my needs, requires constant updates and security maintenance
**Next.js:** Powerful but more complex than I needed for a simple blog
**Gatsby:** Great but has a steeper learning curve
**Hugo:** Perfect balance of simplicity, speed, and flexibility

Hugo's key advantages that won me over:
- **Blazing fast performance** - builds sites in milliseconds
- **No database required** - everything is file-based
- **Built-in SEO features** - clean URLs, meta tags, and sitemaps
- **Large theme ecosystem** - though I ended up building my own
- **Go templates** - easy to learn and powerful

The decision came down to wanting to focus on **writing content** rather than managing infrastructure. Hugo let me do exactly that.

---

## How It All Started

It began with a tutorial I found on YouTube. I was completely new to Hugo, so following along gave me a good start. But then the YouTuber stopped short of covering the full workflow. I got stuck, confused, and frustrated.

For a moment, I considered abandoning Hugo altogether. But then I remembered why I started: I wanted to **own my blog** and learn something new. So I pushed through.

[At this stage, I want to give a **huge shoutout to Lama Dev**](https://youtu.be/6BRZ-yHjYwo?si=WbmoO3Pqc0pEd3PH). His style of teaching is incredibly simple, flexible, and easy to follow. Even though his tutorial didn't cover everything I needed, it gave me a solid foundation and the confidence to experiment on my own. That mix of following a great teacher and then figuring out the rest by myself was exactly what I needed.

---

## The Technical Setup Process

Here's my complete setup process from start to finish:

### 1. Local Development Environment

# Install Hugo
brew install hugo  # On macOS

# Create new site
hugo new site devviews
cd devviews

# Initialize git
git init
git add .
git commit -m "Initial commit"

### 2. Netlify Deployment
I connected my GitHub repository to Netlify with these settings:

Build command: hugo --minify

Publish directory: public

Hugo version: 0.128.0

The deployment was instant and automatic - every git push triggers a new build.

### 3. Custom Domain Setup
I purchased my domain through Namecheap and configured Netlify DNS:

A record: 75.2.60.5 (Netlify's IP)

CNAME: www to my Netlify domain

SSL: Automatic through Netlify

The Big Challenge: Adding Search
The first major roadblock I hit was search. A blog without search feels incomplete, and I was determined to add one.

I looked everywhere — YouTube, blogs, forums — and couldn't find a solid tutorial on Hugo search. Even ChatGPT and DeepSeek initially couldn't point me to an existing guide. That's when I decided to flip the problem: instead of looking for a tutorial, I asked AI how to build it myself.

After trial and error, I got search working with Lunr.js. The day it finally clicked, it felt like magic.

👉 I later turned that whole experience into a full guide:
👉 [How I Added Search to My Hugo Blog.](https://devviews.com/posts/add-search-to-hugo/)

Building Momentum
That win gave me momentum. Once I had search working, I felt unstoppable. I moved on to:

Adding a comment system with Utterances, so readers could interact with me directly using their GitHub accounts.

Setting up Google Analytics to learn where visitors come from.

Creating a newsletter signup with Formspree — no backend required.

Implementing dark mode toggle with CSS variables and JavaScript

Adding responsive design for mobile devices

👉 [I also documented the full comment system setup here:
How I Added Comments to My Hugo Blog.](https://devviews.com/posts/how-to-add-comment-to-hugo/)

Each feature I added made DevViews feel more alive. But new features also brought new challenges.

Performance Optimization Results
After implementing all features, I ran performance tests:

Lighthouse Scores:

Performance: 98/100

Accessibility: 100/100

Best Practices: 100/100

SEO: 100/100

Load Times:

Homepage: 1.2s (on 3G)

Blog posts: 1.4s average

Search functionality: 0.8s response time

The combination of Hugo's static generation and Netlify's CDN resulted in exceptional performance that I couldn't have achieved with traditional CMS platforms.

Unexpected Challenges (and How I Solved Them)
1. The Phantom CSS Bug
Sometimes I'd update my CSS, refresh the browser, and my site looked broken. Refresh again, and it would fix itself. It drove me crazy until I discovered the culprit: browser caching.

Fix: I forced browsers to always fetch the latest CSS by adding a version parameter:

```
<link rel="stylesheet" href="/css/style.css?v={{ now.Unix }}">
```

That {{ now.Unix }} makes Hugo append a unique timestamp on every build, so the browser thinks it's a new file each time. Problem solved ✅.

2. The Invisible Blog Post
I published my first post about adding search, but it never showed up in search results.

After hours of debugging, I realized Hugo was generating a different slug than what my JS expected.

Fix: I explicitly set the slug in the front matter:

yaml
title: "How I Added Search Bar to My Hugo Blog"
slug: "add-search-to-hugo"
As soon as I did that, the post appeared. Another lesson learned.

3. Code Block Overflow
Long code snippets kept breaking my layout, overflowing into sidebars, and looking messy.

Fix: I updated my CSS:

```
pre {
  overflow-x: auto;
  padding: 1rem;
  margin: 1.5rem 0;
  background: #1f2937;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  max-width: 100%;
}

pre code {
  display: block;
  overflow-x: auto;
  white-space: pre;
  word-wrap: normal;
}
```

Now, code stays neat inside scrollable boxes. A small change, but it made a big difference in professionalism.

4. Image Optimization Challenge
Initially, my images were slowing down the site. I implemented:

bash
# Convert images to WebP
convert image.jpg -quality 85 image.webp

# Resize images
convert image.jpg -resize 1200x630 image.jpg
Plus added lazy loading:

```
<img src="image.jpg" loading="lazy" alt="Description">
```

Lessons Learned
This project taught me way more than just Hugo. Here are my key takeaways:

Technical Lessons:
Static sites are powerful - You don't always need a database

CSS variables are amazing for theme switching

JavaScript modules keep code organized

Progressive enhancement ensures basic functionality always works

Personal Growth:
🧠 Be patient with the process - Progress isn't always linear

🎯 Focus on solving one problem at a time - Don't get overwhelmed

💪 Push through frustration instead of giving up - Breakthroughs come after struggles

🤝 Ask for help when needed - Communities are incredibly supportive

AI Collaboration:
I also realized how powerful it is to combine AI tools with my own curiosity. ChatGPT and DeepSeek didn't hand me answers — they gave me the pieces, and I put the puzzle together. That's how I grew as a developer.

The key was learning to ask better questions and verify the solutions rather than just copying code.

What's Next for DevView
I'm constantly improving my site. Here's what's coming next:

Short-term Goals:
Unify JavaScript - Combine search, comments, and theme toggles into one efficient bundle

Add RSS feed - Make it easy for readers to subscribe

Implement pagination - Better navigation for article lists

Add reading time - Help readers estimate time commitment

Medium-term Plans:
Performance optimizations - Implement service worker for offline functionality

More interactive elements - Maybe some subtle animations

Content expansion - Video tutorials alongside written content

Community features - Maybe a forum or discussion area

Long-term Vision:
Monetization strategy - Ethical ads or sponsored content

Newsletter expansion - Regular updates and exclusive content

Open source contributions - Give back to the Hugo community

Tutorial series - Help other beginners start their blogging journey

### Resources That Helped Me
### Here are the exact resources I used throughout my journey:

### Tutorials:
#### [Lama Dev's Hugo Tutorial - Great foundation](https://youtu.be/6BRZ-yHjYwo?si=WbmoO3Pqc0pEd3PH)

#### [Hugo Documentation - Always helpful](https://gohugo.io/documentation/)

#### [MDN Web Docs - For CSS/JS reference](https://developer.mozilla.org/)

### Tools:
#### Visual Studio Code - My code editor of choice

#### GitHub - Version control and deployment

#### Netlify - Hosting and continuous deployment

#### Google Analytics - Understanding my audience

#### PageSpeed Insights - Performance optimization

### Communities:
#### Hugo Forums - Helpful community support

#### Dev.to - Great for specific questions

#### Stack Overflow - Problem-solving resource

## Final Thoughts
Building DevView was tough but worth it. Every bug, every confusing error, and every fix made me better.

If you're thinking about starting your own blog, my advice is simple: just start. Don't worry if you get stuck — you'll figure it out, just like I did. And when you do, the sense of ownership and pride is unbeatable.

The journey from idea to live website taught me more than any tutorial could. The challenges forced me to learn, adapt, and grow as a developer.

## You can check out my other detailed posts here:

👉 [How I Added Search to My Hugo Blog](https://devviews.com/posts/add-search-to-hugo/)

👉 [How I Added Comments to My Hugo Blog](https://devviews.com/posts/how-to-add-comment-to-hugo/)

👉 [And once again, credit to Lama Dev for his approachable teaching style that gave me my first push.](https://youtu.be/6BRZ-yHjYwo?si=WbmoO3Pqc0pEd3PH)

Thanks for reading — and welcome to DevViews 🚀.

Have questions about building your own Hugo blog? [Leave a comment below or reach out on Twitter - I'm happy to help fellow developers on their journey!](https://x.com/godfreycode1)