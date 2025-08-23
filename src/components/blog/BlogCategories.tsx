"use client";

import { WordPressCategory } from '@/lib/wordpress';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogCategoriesProps {
  categories: WordPressCategory[];
}

const BlogCategories = ({ categories }: BlogCategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryClick = (categoryId: number) => {
    if (currentCategory === categoryId.toString()) {
      // Remove category filter
      router.push('/blogs');
    } else {
      // Apply category filter
      router.push(`/blogs?category=${categoryId}`);
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="blog-categories mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Categories
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
              currentCategory === category.id.toString()
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center justify-between">
              <span>{category.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({category.count})
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Clear filters */}
      {currentCategory && (
        <button
          onClick={() => router.push('/blogs')}
          className="w-full mt-4 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default BlogCategories;
