"use client";

import { WordPressPost } from '@/lib/wordpress';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogListProps {
  posts: WordPressPost[];
}

const BlogList = ({ posts }: BlogListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-gray-600 mb-4">
          No blog posts found
        </h3>
        <p className="text-gray-500">
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.filter(post => post && post.title && post.title.rendered).map((post) => (
          <article key={post.id} className="blog-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Featured Image */}
            {post.featured_media && (
              <div className="blog-image h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '')}/wp-content/uploads/${post.featured_media}`}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Date */}
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {post.title.rendered}
                </Link>
              </h3>

              {/* Excerpt */}
              {post.excerpt?.rendered && post.excerpt.rendered.trim() !== '' && (
                <div 
                  className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                  }}
                />
              )}

              {/* Read More */}
              <Link 
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination can be added here */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {posts.length} posts
        </p>
      </div>
    </div>
  );
};

export default BlogList;
