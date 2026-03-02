# Collectibles Marketplace

![Collectibles Marketplace](https://imgix.cosmicjs.com/a13f0da0-5e47-11f0-b0a3-e77e3f19ecb2-vintage-map.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning online marketplace for rare and vintage collectibles, powered by [Cosmic](https://www.cosmicjs.com) CMS. Browse curated categories, discover unique products from trusted sellers, and read authentic customer reviews.

## Features

- 🏛️ **Dynamic Product Catalog** — Browse collectibles with rich detail pages
- 👤 **Seller Profiles** — Detailed seller pages with ratings and product listings
- 🏷️ **Category Browsing** — Organized categories with icons and descriptions
- ⭐ **Customer Reviews** — Star-rated reviews linked to products
- 📱 **Fully Responsive** — Mobile-first design for all devices
- ⚡ **Server-Side Rendering** — Fast, SEO-optimized with Next.js 16
- 🎨 **Modern Design** — Warm, elegant UI with smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a5fc6911814e857d308323&clone_repository=69a5fe0611814e857d308355)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online marketplace with product listings, seller profiles, categories, and customer reviews.
>
> User instructions: Collectibles"

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Marketplace'. The content is managed in Cosmic CMS with the following object types: categories, sellers, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Collectibles"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing categories, sellers, products, and reviews

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file with:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Description |
|------------|-------------|
| `categories` | Product categories with name, description, and icon |
| `sellers` | Seller profiles with bio, photo, location, and rating |
| `products` | Product listings with price, condition, year, images, and linked seller/category |
| `reviews` | Customer reviews with rating and linked product |

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to a Git repository
2. Import the project on [Netlify](https://netlify.com)
3. Add environment variables in the Netlify dashboard
4. Set the build command to `bun run build` and publish directory to `.next`

<!-- README_END -->