import { notFound } from 'next/navigation';
import { wordpressAPI } from '@/lib/wordpress';
import WordPressBlogDetailsLeft from '@/components/blog/WordPressBlogDetailsLeft';
import WordPressBlogDetailsTop from '@/components/blog/WordPressBlogDetailsTop';
import WordPressRelatedPosts from '@/components/blog/WordPressRelatedPosts';
import SeoData from '@/components/tools/SeoData';
import { WordPressPost } from '@/lib/wordpress';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await wordpressAPI.getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - EcomLifters',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title.rendered} - EcomLifters Blog`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

// Generate static params for build time
export async function generateStaticParams() {
  try {
    const posts = await wordpressAPI.getPosts({ per_page: 100 });
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await wordpressAPI.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category)
  const relatedPosts = post.categories.length > 0 
    ? await wordpressAPI.getPostsByCategory(post.categories[0], { per_page: 3 })
    : [];

  return (
    <>
      <SeoData
        title={post.title.rendered}
        description={post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)}
      />
      
      <main className="blog-post-page">
        {/* Blog Post Header */}
        <WordPressBlogDetailsTop post={post} />

        {/* Blog Post Content */}
        <section className="blog-content py-8 md:py-12">
          <WordPressBlogDetailsLeft post={post} />
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <WordPressRelatedPosts 
            posts={relatedPosts}
            title="Related Posts"
          />
        )}
      </main>
    </>
  );
}
