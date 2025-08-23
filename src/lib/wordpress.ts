// WordPress API Configuration
export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://mediumpurple-fish-201640.hostingersite.com/wp-json/wp/v2';

// WordPress API endpoints
export const WORDPRESS_ENDPOINTS = {
  posts: `${WORDPRESS_API_URL}/posts`,
  pages: `${WORDPRESS_API_URL}/pages`,
  categories: `${WORDPRESS_API_URL}/categories`,
  tags: `${WORDPRESS_API_URL}/tags`,
  media: `${WORDPRESS_API_URL}/media`,
};

// WordPress post types
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  _links: any;
  categories: number[];
  tags: number[];
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  meta: any[];
}

// WordPress API functions
export class WordPressAPI {
  private baseUrl: string;

  constructor(apiUrl?: string) {
    this.baseUrl = apiUrl || WORDPRESS_API_URL;
  }

  // Get all blog posts
  async getPosts(params: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressPost[]> {
    // During build time, if no WordPress URL is configured, return empty array
    if (!WORDPRESS_API_URL || WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      console.log('WordPress API URL not configured, returning empty posts array for build');
      return [];
    }

    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params.category) searchParams.append('category', params.category.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.orderby) searchParams.append('orderby', params.orderby);
    if (params.order) searchParams.append('order', params.order);

    const url = `${this.baseUrl}/posts?${searchParams.toString()}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      return [];
    }
  }

  // Get a single blog post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    // During build time, if no WordPress URL is configured, return null
    if (!WORDPRESS_API_URL || WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      console.log('WordPress API URL not configured, returning null for build');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/posts?slug=${slug}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const posts = await response.json();
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error('Error fetching WordPress post:', error);
      return null;
    }
  }

  // Get all categories
  async getCategories(): Promise<WordPressCategory[]> {
    // During build time, if no WordPress URL is configured, return empty array
    if (!WORDPRESS_API_URL || WORDPRESS_API_URL === 'https://your-wordpress-site.com/wp-json/wp/v2') {
      console.log('WordPress API URL not configured, returning empty categories array for build');
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/categories`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress categories:', error);
      return [];
    }
  }

  // Get posts by category
  async getPostsByCategory(categoryId: number, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<WordPressPost[]> {
    const searchParams = new URLSearchParams();
    searchParams.append('category', categoryId.toString());
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.per_page) searchParams.append('per_page', params.per_page.toString());

    try {
      const response = await fetch(`${this.baseUrl}/posts?${searchParams.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress posts by category:', error);
      return [];
    }
  }

  // Search posts
  async searchPosts(query: string, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<WordPressPost[]> {
    const searchParams = new URLSearchParams();
    searchParams.append('search', query);
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.per_page) searchParams.append('per_page', params.per_page.toString());

    try {
      const response = await fetch(`${this.baseUrl}/posts?${searchParams.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching WordPress posts:', error);
      return [];
    }
  }
}

// Create default instance
export const wordpressAPI = new WordPressAPI();
