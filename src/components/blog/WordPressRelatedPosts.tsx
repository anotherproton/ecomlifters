"use client";

import { WordPressPost } from "@/lib/wordpress";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import InnerSectionTitle from "../sectionTitle/InnerSectionTitle";

interface WordPressRelatedPostsProps {
  posts: WordPressPost[];
  title: string;
}

const WordPressRelatedPosts = ({ posts, title }: WordPressRelatedPostsProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts py-16 bg-gray-50 dark:bg-gray-900" ref={containerRef}>
      <div className="container mx-auto px-4">
        <InnerSectionTitle
          title={title}
          className="text-center mb-12"
          heading1
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="related-post-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Featured Image */}
              {post.featured_media && (
                <div className="related-post-image h-48 bg-gray-200 dark:bg-gray-700">
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  <Link 
                    href={`/blogs/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {post.title.rendered}
                  </Link>
                </h3>

                {/* Excerpt */}
                <div 
                  className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...' 
                  }}
                />

                {/* Read More */}
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
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
      </div>
    </section>
  );
};

export default WordPressRelatedPosts;
