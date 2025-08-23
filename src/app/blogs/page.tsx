import { Suspense } from 'react';
import { wordpressAPI } from '@/lib/wordpress';
import BlogList from '@/components/blog/BlogList';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogCategories from '@/components/blog/BlogCategories';
import SeoData from '@/components/tools/SeoData';

// Generate metadata for the page
export const metadata = {
  title: 'Blog - EcomLifters',
  description: 'Read our latest insights on e-commerce, digital marketing, and business growth strategies.',
};

// Fetch blog posts at build time or request time
async function getBlogPosts() {
  try {
    const posts = await wordpressAPI.getPosts({
      per_page: 12,
      orderby: 'date',
      order: 'desc'
    });
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch categories
async function getCategories() {
  try {
    const categories = await wordpressAPI.getCategories();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return (
    <>
      <SeoData
        title="Blog - EcomLifters"
        description="Read our latest insights on e-commerce, digital marketing, and business growth strategies."
      />
      
      <main className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Insights, strategies, and tips to help your business grow
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="blog-content py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <BlogSearch />
                  <Suspense fallback={<div>Loading categories...</div>}>
                    <BlogCategories categories={categories} />
                  </Suspense>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Suspense fallback={<div>Loading blog posts...</div>}>
                  <BlogList posts={posts} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
