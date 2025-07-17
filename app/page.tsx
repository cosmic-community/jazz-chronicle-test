import { getPosts, getCategories } from '@/lib/cosmic';
import { Post, Category } from '@/types';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import Hero from '@/components/Hero';

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            No posts available
          </h2>
          <p className="text-gray-500">
            Check back later for the latest jazz content.
          </p>
        </div>
      </div>
    );
  }

  // Get featured post (first post)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">Featured Article</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {featuredPost.metadata?.featured_image && (
              <img
                src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={featuredPost.title}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                {featuredPost.metadata?.category && (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: featuredPost.metadata.category.metadata?.color || '#45B7D1' }}
                  >
                    {featuredPost.metadata.category.metadata?.name || featuredPost.metadata.category.title}
                  </span>
                )}
                {featuredPost.metadata?.published_date && (
                  <time className="text-gray-500 text-sm">
                    {new Date(featuredPost.metadata.published_date).toLocaleDateString()}
                  </time>
                )}
              </div>
              <h3 className="text-3xl font-bold mb-4">
                <a href={`/posts/${featuredPost.slug}`} className="hover:text-secondary">
                  {featuredPost.title}
                </a>
              </h3>
              {featuredPost.metadata?.excerpt && (
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  {featuredPost.metadata.excerpt}
                </p>
              )}
              {featuredPost.metadata?.author && (
                <div className="flex items-center space-x-3">
                  {featuredPost.metadata.author.metadata?.photo && (
                    <img
                      src={`${featuredPost.metadata.author.metadata.photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                      alt={featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                    </p>
                    {featuredPost.metadata.author.metadata?.specialties && (
                      <p className="text-sm text-gray-500">
                        {featuredPost.metadata.author.metadata.specialties}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <CategoryFilter categories={categories} />

      {/* Recent Posts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-primary">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}