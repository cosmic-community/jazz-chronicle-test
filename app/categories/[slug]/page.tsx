// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic';
import { Category } from '@/types';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.metadata?.name || category.title} - Jazz Chronicle`,
    description: category.metadata?.description || `Browse all ${category.metadata?.name || category.title} articles`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([
    getCategory(slug),
    getPostsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Category Header */}
        <header className="mb-12 text-center">
          <div className="mb-4">
            <span
              className="inline-block px-4 py-2 rounded-full text-lg font-medium text-white"
              style={{ backgroundColor: category.metadata?.color || '#45B7D1' }}
            >
              {category.metadata?.name || category.title}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </header>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              No posts in this category yet
            </h2>
            <p className="text-gray-500">
              Check back later for new {category.metadata?.name || category.title} content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}