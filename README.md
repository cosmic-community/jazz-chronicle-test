# Jazz Chronicle

![Jazz Chronicle](https://imgix.cosmicjs.com/e7269270-62db-11f0-a051-23c10f41277a-photo-1508700115892-45ecd05ae2ad-1752735705765.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern Next.js blog platform for jazz music enthusiasts, featuring articles on jazz history, artist spotlights, album reviews, and live performances. Built with Cosmic CMS for seamless content management.

## ✨ Features

- **Modern Jazz Blog Design**: Clean, editorial-style interface optimized for jazz content
- **Dynamic Content Management**: Powered by Cosmic CMS with posts, authors, and categories
- **Category Filtering**: Browse by Jazz History, Artist Spotlights, Album Reviews, and Live Performances
- **Author Profiles**: Detailed author pages with bios, photos, and specialties
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Built-in metadata and structured data for better search visibility
- **Fast Performance**: Next.js 15 with App Router for optimal loading speeds

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68789f4a2920a13bc482d26b&clone_repository=68794fbbd8b0fd7b93a73057)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog about Jazz music with posts, authors, and categories.

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Cosmic SDK** - Official SDK for Cosmic API integration

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the bucket containing your jazz blog content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📚 Cosmic SDK Examples

### Fetching Posts

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category data
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single post by slug
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1)
```

### Fetching Authors

```typescript
// Get all authors
const authors = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get posts by specific author
const authorPosts = await cosmic.objects
  .find({ type: 'posts', 'metadata.author': authorId })
  .depth(1)
```

### Fetching Categories

```typescript
// Get all categories
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get posts by category
const categoryPosts = await cosmic.objects
  .find({ type: 'posts', 'metadata.category': categoryId })
  .depth(1)
```

## 🎯 Cosmic CMS Integration

This application integrates with your Cosmic bucket using the following content types:

- **Posts**: Jazz articles with title, excerpt, content, featured image, author, category, tags, and published date
- **Authors**: Writer profiles with name, bio, photo, email, website, social media, and specialties
- **Categories**: Content organization with name, description, and color coding

The integration uses the Cosmic SDK to fetch content with proper relationships between posts, authors, and categories using the `depth` parameter.

## 🚀 Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic builds on push

### Netlify

1. Connect your repository to Netlify
2. Add environment variables in site settings
3. Deploy with automatic builds

### Environment Variables

Set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->