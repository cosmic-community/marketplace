// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    icon_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Seller object type
export interface Seller extends CosmicObject {
  type: 'sellers';
  metadata: {
    display_name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    location?: string;
    seller_rating?: string | number;
  };
}

// Product object type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: string | number;
    condition?: string | { key?: string; value?: string };
    year?: string | number;
    images?: Array<{
      url: string;
      imgix_url: string;
    }> | {
      url: string;
      imgix_url: string;
    };
    seller?: Seller;
    category?: Category;
  };
}

// Review object type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: string | number;
    review_text?: string;
    product?: Product;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Helper type for safe metafield value extraction
export type MetafieldValue = string | number | boolean | { key?: string; value?: string } | null | undefined;