import Link from 'next/link'

interface Author {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    bio?: string
    photo?: {
      url: string
      imgix_url: string
    }
    email?: string
    website?: string
    twitter?: string
    specialties?: string
  }
}

interface Category {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description?: string
    color?: string
  }
}

interface Post {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    excerpt?: string
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    category?: Category
    tags?: string
    published_date?: string
  }
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        {post.metadata.featured_image && (
          <Link href={`/posts/${post.slug}`}>
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}
        
        {/* Category Badge */}
        {post.metadata.category && (
          <div className="absolute top-4 left-4">
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: post.metadata.category.metadata.color || '#6B7280' }}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 opacity-70"></span>
              {post.metadata.category.metadata.name}
            </Link>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-jazz-blue transition-colors duration-200 line-clamp-2 group-hover:text-jazz-blue">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}
        
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {post.metadata.author && (
              <>
                {post.metadata.author.metadata.photo && (
                  <img
                    src={`${post.metadata.author.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    className="w-8 h-8 rounded-full mr-3 border-2 border-gray-100"
                  />
                )}
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    {post.metadata.author.metadata.name}
                  </span>
                  {post.metadata.published_date && (
                    <div className="text-xs text-gray-500">
                      {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          {/* Read More Button */}
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-jazz-blue hover:text-jazz-teal font-medium text-sm transition-colors duration-200"
          >
            Read More
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Tags */}
        {post.metadata.tags && (
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.split(',').slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}