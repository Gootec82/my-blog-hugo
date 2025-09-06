---
title: "How I Built My First Blog "
date: 2025-09-01T08:00:00+00:00
draft: false
description: "The story of how I built my developer blog, DevView, from scratch using Hugo, Netlify, and AI as my co-pilot."
image: "/images/blogimage.webp"
imageBig: "/images/blogimage.webp"
imageAlt: "a screen shot of my hugo blog footer"
categories: ["webdev", "beginners", "hugo", "showdev"]
tags: ["hugo", "netlify", "ai", "webdev", "javascript"]
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

# How I Built My First Blog


I'm incredibly excited to finally share my first developer blog, **DevView**! This project was born from my desire to have a space I truly own. 😄 I wanted my own brand, which is why I chose to go with **Hugo** instead of a platform like Hashnode or Medium (I have accounts there too, but I craved full control).

I picked Hugo over something like Next.js because I wanted to try something new—and I'm so happy I did! Hugo is blazingly fast, and I've heard static sites are less prone to hacking, which definitely gives me peace of mind.

Deploying with **Netlify** was a no-brainer. It's so simple, and everything just clicks into place perfectly. But let me be real—it wasn't all smooth sailing.

## How It All Started

It all began when I was following a tutorial on YouTube. The YouTuber stopped at a certain point, and I got completely stuck. I had never used Hugo before—this was my first time! I felt lost and was honestly ready to give up and jump into a new project. But I told myself, "No, you need to finish this."

## The Big Challenge: Adding Search

The biggest challenge was adding a **functional search bar**. I scoured YouTube for videos on how to do it in Hugo and found nothing. I even asked ChatGPT and DeepSeek if they knew of any tutorials. Still nothing! So I changed my strategy: I asked the AIs directly *how to build one*. DeepSeek especially came through with some solid guidelines. After some tinkering, I succeeded in making it work with **Lunr.js**. ([I even wrote a post about it!](/posts/my-search-bar-post)).

## Building Momentum

That win gave me the momentum to keep going. Next, I added:

- A **comment section using Utterances** (which hooks right into GitHub issues—so cool!)
- **Google Analytics** to understand my visitors
- A **newsletter signup using Formspree** without any backend hassle

## Unexpected Challenges & Solutions

Along the way, I hit some weird roadblocks that I never expected. Figuring these out felt like solving a mystery!

### The Phantom CSS Bug

I'd make an update to my CSS file, hit `Ctrl + S`, and refresh my browser... only to see my styles completely broken! Then I'd save the file again, and suddenly everything would look perfect—until it broke again on the next refresh. It was driving me crazy!

After some digging, I discovered it was a **browser caching issue** combined with how Hugo builds pages. The browser was holding onto the old version of my CSS file.

**My Solution:** I forced the browser to reload the latest CSS by adding a **version parameter** to my CSS link. I changed this:

```html
<link rel="stylesheet" href="/css/style.css">

to this in my Hugo template:

<link rel="stylesheet" href="/css/style.css?v={{ now.Unix }}">

The {{ now.Unix }} part adds a unique number (a timestamp) to the end of the file URL every time the site builds. This tricks the browser into thinking it's a completely new file, so it always loads the latest version. Problem solved! ✅

The Invisible Blog Post
I published my first real post, but it was completely missing from my blog's search results! I could see the post file (add-search-to-hugo.md) and the content was in the index.json file that Lunr.js uses, but the search couldn't find it.

After hours of confusion, I discovered the culprit: a mismatch between my filename and the slug in the front matter.

My file was named: add-search-to-hugo.md
But my front matter title was: title: "How I Added Search Bar to My Hugo Blog"

Hugo automatically generates a URL "slug" from the title, which was how-i-added-search-bar-to-my-hugo-blog. But my search script was looking for a slug that matched the filename: add-search-to-hugo.

My Solution: I added an explicit slug parameter to my post's front matter to exactly match my filename:

title: "How I Added Search Bar to My Hugo Blog"
slug: "add-search-to-hugo" # This fixed everything!
date: 2025-09-01


After this update, my post appeared in search results instantly! It was a huge relief and a valuable lesson in how Hugo manages URLs. ✅


The CSS Overflow Problem & How I Fixed It

While writing this post, I encountered a frustrating layout issue: whenever I added code snippets, they would break out of their containers and mess up my entire page layout. The text would overflow, the sidebars would get pushed around, and everything looked broken.

Here's what was happening:

Code blocks (<pre> tags) have a default behavior of not wrapping text

Long lines of code would extend beyond their containers

This caused horizontal scrolling on the entire page instead of just the code block

The layout became messy and unprofessional-looking

The solution turned out to be surprisingly simple! I added this CSS to my theme:

/* Contained code blocks with proper scrolling */
pre {
  overflow-x: auto;
  padding: 1rem;
  margin: 1.5rem 0;
  background: #1f2937;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  max-width: 100%;
}

/* Ensured code displays properly */
pre code {
  display: block;
  overflow-x: auto;
  white-space: pre;
  word-wrap: normal;
}

What this fix does:

overflow-x: auto adds horizontal scrolling only when needed

max-width: 100% prevents code blocks from exceeding their container

The padding, background, and border make code blocks visually distinct

white-space: pre preserves code formatting without breaking layout

Now my code snippets stay neatly contained in their own scrollable boxes, and the rest of my content flows perfectly around them! It's one of those small fixes that makes a huge difference in readability and professionalism.

Lessons Learned
It wasn't easy, but the feeling of overcoming those challenges and having a site that I built exactly how I wanted is unbeatable. That said, I'm still smoothing out a few quirks! For example, my main app.js works for categories and dark/light mode, but doesn't play nicely with the homepage, search bar, or Utterances yet—so I'm using separate JS files for now. I'll tackle that later!

Throughout this process, I used AI not to do the work for me, but as a guide to learn and find my own answers. Most importantly, I learned to:

🧠 Be patient with the process

🎯 Stay focused on one problem at a time

💪 Not give up easily when facing obstacles

Start Your Own Journey
If you're thinking about building your own blog, just start. You'll hit walls, but I promise you can break through them. The satisfaction of creating something truly your own is worth every challenge.

Feel free to check out my site and let me know what you think—I'd love your feedback in the comments! And if you like what you see, please subscribe to my newsletter for updates.

Happy coding! 🚀