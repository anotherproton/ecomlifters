"use client";

import { WordPressPost } from "@/lib/wordpress";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import hasFadeAnim from "@/lib/animation/hasFadeAnim";
import MainSectionTitle from "../sectionTitle/MainSectionTitle";
import { format } from "date-fns";

interface WordPressBlogDetailsTopProps {
  post: WordPressPost;
}

const WordPressBlogDetailsTop = ({ post }: WordPressBlogDetailsTopProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      hasFadeAnim();
    },
    { scope: containerRef }
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div ref={containerRef} className="pt-24 pb-16 md:pt-32">
      <h1 
        className="font-normal text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[56px] leading-tight mb-6 text-center"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      
      <div className="has_fade_anim mb-8 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.categories.length} Categories</span>
          <span>•</span>
          <span>{post.tags.length} Tags</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Featured Image */}
        {post.featured_media && (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '')}/wp-content/uploads/${post.featured_media}`}
              alt={post.title.rendered}
              className="w-full h-auto max-h-[450px] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WordPressBlogDetailsTop;
