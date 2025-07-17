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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-jazz-blue to-jazz-teal rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No posts available yet
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We're preparing some incredible jazz content for you. Check back soon for the latest stories, reviews, and insights.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get featured post (first post)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4); // Show 3 recent posts
  const moreRecentPosts = posts.slice(4); // Remaining posts

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Featured Post Section */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-jazz-blue to-jazz-teal rounded-full mr-4"></span>
                Featured Story
              </h2>
              <div className="hidden md:block text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                Editor's Pick
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredPost.metadata?.featured_image && (
                    <img
                      src={`${featuredPost.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex items-center space-x-4 mb-6">
                    {featuredPost.metadata?.category && (
                      <span
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white shadow-sm"
                        style={{ backgroundColor: featuredPost.metadata.category.metadata?.color || '#45B7D1' }}
                      >
                        <span className="w-2 h-2 bg-white rounded-full mr-2 opacity-70"></span>
                        {featuredPost.metadata.category.metadata?.name || featuredPost.metadata.category.title}
                      </span>
                    )}
                    {featuredPost.metadata?.published_date && (
                      <time className="text-gray-500 text-sm font-medium">
                        {new Date(featuredPost.metadata.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-tight">
                    <a href={`/posts/${featuredPost.slug}`} className="hover:text-jazz-blue transition-colors duration-200">
                      {featuredPost.title}
                    </a>
                  </h3>
                  
                  {featuredPost.metadata?.excerpt && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed line-clamp-3">
                      {featuredPost.metadata.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {featuredPost.metadata?.author && (
                      <div className="flex items-center space-x-3">
                        {featuredPost.metadata.author.metadata?.photo && (
                          <img
                            src={`${featuredPost.metadata.author.metadata.photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                            alt={featuredPost.metadata.author.metadata?.name || featuredPost.metadata.author.title}
                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
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
                    
                    <a
                      href={`/posts/${featuredPost.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-jazz-blue to-jazz-teal text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Read Article
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter with enhanced design */}
        <div className="mb-12">
          <CategoryFilter categories={categories} />
        </div>

        {/* Recent Posts Grid */}
        {recentPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-jazz-teal to-jazz-green rounded-full mr-4"></span>
                Latest Stories
              </h2>
              <div className="hidden md:block">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-jazz-blue rounded-full"></div>
                  <div className="w-2 h-2 bg-jazz-teal rounded-full"></div>
                  <div className="w-2 h-2 bg-jazz-green rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div key={post.id} className="transform hover:scale-105 transition-transform duration-200">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* More Articles Section */}
        {moreRecentPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-jazz-red to-jazz-gold rounded-full mr-4"></span>
                More Articles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreRecentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {post.metadata?.featured_image && (
                    <img
                      src={`${post.metadata.featured_image.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`}
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      <a href={`/posts/${post.slug}`} className="hover:text-jazz-blue transition-colors duration-200">
                        {post.title}
                      </a>
                    </h3>
                    {post.metadata?.published_date && (
                      <time className="text-xs text-gray-500">
                        {new Date(post.metadata.published_date).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup CTA */}
        <section className="bg-gradient-to-r from-jazz-blue via-jazz-teal to-jazz-green rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get the latest jazz insights, artist spotlights, and album reviews delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-8 py-3 bg-white text-jazz-blue font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}