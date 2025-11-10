---
title: "Hugo Shortcodes: Create Custom Components Like a Pro"
slug: "hugo-shortcodes-custom-components"
date: 2025-11-10
description: "Master Hugo shortcodes to create reusable custom components. Learn to build alerts, galleries, embeds, and more with step-by-step examples for your static site."
tags: ["hugo", "shortcodes", "static site", "web development", "hugo components"]
categories: ["Web Development"]
draft: false
image: "/images/hugo-shortcodes.webp"
imageBig: "/images/hugo-shortcodes.webp"
imageAlt: "Hugo shortcode examples showing custom components and their code"
authors: ["Godfrey O Omoregie"]
avatar: "/images/author.webp"
---

Hey there! 👋 Remember when we talked about connecting custom domains and adding search bars to Hugo? Well, today we're leveling up with one of Hugo's most powerful features: **Shortcodes**!

If you've ever found yourself copying and pasting the same complex HTML across multiple pages, or wishing you could create custom components like those fancy JavaScript frameworks, shortcodes are about to become your new best friend.

## What Are Shortcodes, Really?

Think of shortcodes like **custom HTML macros** - little shortcuts that let you create reusable components with simple tags.

### Before Shortcodes:
```html
<!-- Repeated complex HTML everywhere -->
<div class="alert alert-warning">
    <div class="alert-icon">⚠️</div>
    <div class="alert-content">
        <strong>Warning:</strong> This is an important message!
    </div>
</div>
```

After Shortcodes:

```html
{{</* alert type="warning" */>}}
This is an important message!
{{</* /alert */>}}
```

See the magic? ✨ One line instead of five, and consistent across your entire site!

Why Shortcodes Will Change Your Hugo Workflow
1. Consistency
Same component, same look everywhere

No more "oops I forgot a class" moments

2. Maintainability
Change one shortcode file → Update entire site

3. Readability
Your content stays clean and focused

4. Power
Access to Hugo's full templating power in your content

Creating Your First Shortcode
Let's start simple with a warning alert shortcode.

Step 1: Create the Shortcode File
Create layouts/shortcodes/alert.html:

```html
{{ $type := .Get "type" | default "info" }}
{{ $icon := "" }}

{{ if eq $type "warning" }}
    {{ $icon = "⚠️" }}
{{ else if eq $type "success" }}
    {{ $icon = "✅" }}
{{ else if eq $type "error" }}
    {{ $icon = "❌" }}
{{ else }}
    {{ $icon = "ℹ️" }}
{{ end }}

<div class="alert alert-{{ $type }}">
    <div class="alert-icon">{{ $icon }}</div>
    <div class="alert-content">
        {{ .Inner }}
    </div>
</div>
```
Step 2: Add CSS
In your assets/css/main.css:

```css
.alert {
    border-left: 4px solid;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.alert-icon {
    font-size: 1.2em;
    line-height: 1;
}

.alert-info {
    background: #e3f2fd;
    border-color: #2196f3;
    color: #0d47a1;
}

.alert-warning {
    background: #fff3e0;
    border-color: #ff9800;
    color: #e65100;
}

.alert-success {
    background: #e8f5e8;
    border-color: #4caf50;
    color: #2e7d32;
}

.alert-error {
    background: #ffebee;
    border-color: #f44336;
    color: #c62828;
}
```

Step 3: Use It!
In your Markdown content:


```
{{</* alert type="warning" */>}}
```
**Remember:** Always backup your site before making major changes!

```html
{{</* /alert */>}}

{{</* alert type="success" */>}}
```
Your shortcode is working perfectly!

```html
{{</* /alert */>}}
```
Practical Shortcode Examples
1. YouTube Embed Shortcode
Create layouts/shortcodes/youtube.html:

```html
{{ $id := .Get "id" }}
{{ $title := .Get "title" | default "YouTube video" }}

<div class="video-container">
    <iframe 
        src="https://www.youtube.com/embed/{{ $id }}" 
        title="{{ $title }}"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>
```

```css
<style>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin: 1.5rem 0;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
</style>
```

```html
{{</* youtube id="dQw4w9WgXcQ" title="Awesome Tutorial" */>}}
```
1. Image Gallery Shortcode
Create layouts/shortcodes/gallery.html:

```html
<div class="gallery">
    {{ range .Page.Resources.Match (.Get "pattern") }}
    <div class="gallery-item">
        <img src="{{ .RelPermalink }}" alt="{{ .Title }}" loading="lazy">
        {{ with .Title }}<div class="gallery-caption">{{ . }}</div>{{ end }}
    </div>
    {{ end }}
</div>
```

```css
<style>
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.gallery-item {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

.gallery-caption {
    padding: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
}
</style>
```

```html
{{</* gallery pattern="gallery/*" */>}}
```
3. Call-to-Action Button Shortcode
Create layouts/shortcodes/button.html:

```html
{{ $url := .Get "url" }}
{{ $text := .Get "text" }}
{{ $style := .Get "style" | default "primary" }}

<a href="{{ $url }}" class="btn btn-{{ $style }}">
    {{ $text }}
</a>
```

```css
<style>
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    margin: 0.5rem;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-outline {
    border: 2px solid #3b82f6;
    color: #3b82f6;
    background: transparent;
}

.btn-outline:hover {
    background: #3b82f6;
    color: white;
}
</style>
```

```html
{{</* button url="/contact" text="Get in Touch" style="primary" */>}}
{{</* button url="/pricing" text="View Pricing" style="outline" */>}}
```
Advanced Shortcode Techniques
Using Site Parameters in Shortcodes
Access your config.toml settings:

```html
{{/* layouts/shortcodes/contact.html */}}
<div class="contact-info">
    <h3>Get in Touch</h3>
    <p>Email: {{ .Site.Params.email }}</p>
    <p>Twitter: {{ .Site.Params.social.twitter }}</p>
</div>
```
Conditional Shortcodes

```html
{{/* layouts/shortcodes/feature.html */}}
{{ $feature := .Get "name" }}
{{ $available := .Site.Params.features }}

{{ if index $available $feature }}
<div class="feature available">
    ✅ {{ .Get "name" }} is available!
</div>
{{ else }}
<div class="feature coming-soon">
    🚧 {{ .Get "name" }} - coming soon!
</div>
{{ end }}
```
Nested Shortcodes
You can even nest shortcodes within other shortcodes!

```html
{{/* layouts/shortcodes/columns.html */}}
<div class="columns">
    {{ .Inner }}
</div>
```

```css
<style>
.columns {
    display: grid;
    grid-template-columns: repeat({{ .Get "count" | default 2 }}, 1fr);
    gap: 2rem;
    margin: 2rem 0;
}
</style>
```

```html
{{</* columns count="2" */>}}
{{</* alert type="info" */>}}
Left column content
{{</* /alert */>}}
{{</* alert type="success" */>}}
Right column content
{{</* /alert */>}}
{{</* /columns */>}}
```
Common Shortcode Patterns I Use
1. Note/Tip Boxes

```html
{{</* note */>}}
This is something important to remember...
{{</* /note */>}}
```
2. Code Comparison

```html
{{</* code-compare */>}}
{{</* code-left */>}}
// Old way
console.log("hello");
{{</* /code-left */>}}
{{</* code-right */>}}
// New way
print("hello")
{{</* /code-right */>}}
{{</* /code-compare */>}}
3. Progress Steps

{{</* progress-steps */>}}
{{</* step number="1" */>}} Plan your content {{</* /step */>}}
{{</* step number="2" */>}} Write your post {{</* /step */>}}
{{</* step number="3" */>}} Add shortcodes {{</* /step */>}}
{{</* /progress-steps */>}}
```
Debugging Shortcodes
Common Issues:
Problem: Shortcode not rendering


# Check if file is in right location
ls layouts/shortcodes/

# Check Hugo output during build
hugo --verbose
Problem: Parameters not working

```html
<!-- Debug by printing values -->
{{ printf "%#v" .Params }}
```
Problem: CSS not loading

```html
<!-- Check if CSS is included in final build -->
{{ .Inner }}<!-- This should show your content -->
```
Performance Considerations
Good Practices:
Keep shortcodes simple - avoid complex logic in content

Use inline CSS sparingly - prefer your main stylesheet

Lazy load images in gallery shortcodes

Cache expensive operations

Bad Practices:
❌ Complex calculations in every shortcode

❌ Loading external resources without async

❌ Duplicating existing HTML functionality

Real-World Example: My Blog's Shortcodes
Here are some shortcodes I use regularly on my blog:

Update Notice

```html
{{</* update date="2024-12-25" */>}}
```
This post was updated with new examples!

```html
{{</* /update */>}}
```
Tool Recommendation

```html
{{</* tool name="VS Code" url="https://code.visualstudio.com" */>}}
```
My favorite code editor for Hugo development

```html
{{</* /tool */>}}
```
Exercise Box

```html
{{</* exercise */>}}
```
**Your Task:** Create a custom shortcode for displaying quotes
**Hint:** Use the alert shortcode as a starting point

```html
{{</* /exercise */>}}
```

Your Turn: Create a Custom Shortcode
Challenge: Build a person shortcode that displays team member information.

Requirements:

Name, role, and image parameters

Social media links (optional)

Consistent styling

Hover effects

Starter code:

```html
{{/* layouts/shortcodes/person.html */}}
{{ $name := .Get "name" }}
{{ $role := .Get "role" }}
{{ $image := .Get "image" }}

<div class="person-card">
    <!-- Your code here -->
</div>
```

What's Next? Hugo Performance Optimization!
In our next Web Dev post, we'll dive into "Optimizing Hugo Blog Performance" where we'll cover:

Image optimization techniques

CSS and JS minification

Critical path optimization

Lazy loading strategies

Cache configuration

Wrapping Up
Shortcodes transform Hugo from a simple static site generator into a powerful component-based system. You can now:

✅ Create reusable custom components

✅ Maintain consistent design across your site

✅ Simplify complex HTML in your content

✅ Build interactive elements without JavaScript

✅ Debug and optimize your shortcodes

The best part? You're no longer limited by basic Markdown - you can create exactly the components your content needs!

Your Mission
Implement the alert shortcode from this tutorial

Create one custom shortcode for your specific needs

Replace 3 instances of repeated HTML with your new shortcodes

What component would make your writing workflow easier? Share your shortcode ideas in the comments!

Stuck creating a shortcode? Have a cool shortcode idea? Drop a comment below - let's build amazing Hugo components together!