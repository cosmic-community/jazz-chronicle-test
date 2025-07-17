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
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.metadata.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
      )}
      
      <div className="p-6">
        {post.metadata.category && (
          <div className="mb-3">
            <Link 
              href={`/categories/${post.metadata.category.slug}`}
              className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full transition-colors duration-200"
              style={{ backgroundColor: post.metadata.category.metadata.color || '#6B7280' }}
            >
              {post.metadata.category.metadata.name}
            </Link>
          </div>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
        </Link>
        
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {post.metadata.author && (
              <>
                {post.metadata.author.metadata.photo && (
                  <img
                    src={`${post.metadata.author.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <span className="font-medium">
                  {post.metadata.author.metadata.name}
                </span>
              </>
            )}
          </div>
          
          {post.metadata.published_date && (
            <time className="text-gray-400">
              {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
        </div>
        
        {post.metadata.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.metadata.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
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