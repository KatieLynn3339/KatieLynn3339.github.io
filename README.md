# Katie Lynn's Personal Website

A beautiful personal website and blog built with Next.js, Tailwind CSS, and shadcn components. Features a dark/light mode toggle and a clean, modern design perfect for sharing your story.

## Features

✨ **Modern Design** - Built with Tailwind CSS and shadcn components
🌙 **Dark/Light Mode** - Toggle between themes with smooth transitions
📝 **Blog System** - Write markdown blog posts with frontmatter
📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
⚡ **Fast** - Optimized with Next.js for excellent performance
🎨 **Beautiful Colors** - Carefully chosen color palette that works in both themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/KatieLynn3339/KatieLynn3339.github.io.git
cd KatieLynn3339.github.io
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/
│   ├── components/          # Reusable components
│   │   ├── theme-toggle.tsx # Dark/light mode toggle
│   │   └── theme-provider.tsx # Theme provider wrapper
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog post
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout with navigation
│   └── globals.css         # Global styles
├── content/
│   └── blog/               # Markdown blog posts
├── public/                 # Static files
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Writing Blog Posts

Create markdown files in the `content/blog/` directory with the following format:

```markdown
---
title: "Your Post Title"
date: "2024-12-17"
excerpt: "A brief summary of your post"
---

Your content goes here...
```

The blog system will automatically:
- Pick up new markdown files
- Parse the frontmatter (title, date, excerpt)
- Display posts in reverse chronological order
- Generate a detail page for each post

## Customization

### Colors and Theming

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 0 0% 9%;
  --accent: 0 84.2% 60.2%;
  /* ... other variables ... */
}
```

### Site Content

- **Home Page**: Edit `app/page.tsx`
- **Navigation**: Modify `app/layout.tsx`
- **Blog Posts**: Add files to `content/blog/`

### Typography and Spacing

Adjust Tailwind configuration in `tailwind.config.js` to match your preferences.

## Deployment

This project is configured for GitHub Pages. To deploy:

1. Update the `basePath` in `next.config.js` if needed
2. Push to your `main` branch
3. GitHub Pages will automatically deploy the static site

Or deploy to other platforms like Vercel, Netlify, or any static host that supports Next.js exports.

## Technologies Used

- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn** - Component library built on Radix UI
- **next-themes** - Theme management
- **TypeScript** - Type-safe JavaScript

## License

MIT
