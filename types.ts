// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Post interface with typed metadata
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string; // Required field based on Cosmic CMS structure
    excerpt?: string;
    content: string; // Required field based on Cosmic CMS structure
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    published_date?: string;
  };
}

// Author interface with typed metadata
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string; // Required field based on Cosmic CMS structure
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    website?: string;
    twitter?: string;
    specialties?: string;
  };
}

// Category interface with typed metadata
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string; // Required field based on Cosmic CMS structure
    description?: string;
    color?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type PostWithRelations = Post & {
  metadata: {
    author: Author;
    category: Category;
  };
};

export type CreatePostData = Omit<Post, 'id' | 'created_at' | 'modified_at'>;