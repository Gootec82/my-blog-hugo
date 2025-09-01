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


## Why I Picked Hugo And Netlify


I picked Hugo over something like Next.js because I wanted to try something new—and I’m so happy I did! Hugo is blazingly fast, and I’ve heard static sites are less prone to hacking, which definitely gives me peace of mind.

Deploying with **Netlify** was a no-brainer. It’s so simple, and everything just clicks into place perfectly. But let me be real—it wasn’t all smooth sailing.


## How It started


It all started when I was following a tutorial on YouTube. The YouTuber stopped at a certain point, and I got completely stuck. I had never used Hugo before—this was my first time! I felt lost and was honestly ready to give up and jump into a new project. But I told myself, "No, you need to finish this."


## MY Biggest Challenge


The biggest challenge was adding a **functional search bar**. I scoured YouTube for videos on how to do it in Hugo and found nothing. I even asked ChatGPT and DeepSeek if they knew of any tutorials. Still nothing! So I changed my strategy: I asked the AIs directly *how to build one*. DeepSeek especially came through with some solid guidelines. After some tinkering, I succeeded in making it work with **Lunr.js**. ([I even wrote a post about it!](/posts/add-search-to-hugo)).

That win gave me the momentum to keep going. Next, I added a **comment section using Utterances** (which hooks right into GitHub issues—so cool!), set up **Google Analytics** to understand my visitors, and used **Formspree** to add a super simple newsletter signup without any backend hassle.

It wasn’t easy, but the feeling of overcoming those challenges and having a site that I built exactly how I wanted is unbeatable. That said, I’m still smoothing out a few quirks! For example, my main `app.js` works for categories and dark/light mode, but doesn’t play nicely with the homepage, search bar, or Utterances yet—so I’m using separate JS files for now. I’ll tackle that later!

Throughout this process, I used AI not to do the work for me, but as a **guide to learn and find my own answers**. Most importantly, I learned to **be patient, stay focused, and not give up** easily.

If you're thinking about building your own blog, just start. You’ll hit walls, but I promise you can break through them. Feel free to check out [my site](https://devview.netlify.app/) and let me know what you think—I’d love your feedback in the comments! And if you like what you see, please **subscribe to my newsletter** for updates.