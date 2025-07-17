// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic';
import { Post } from '@/types';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || '',
      type: 'article',
      publishedTime: post.metadata?.published_date,
      authors: post.metadata?.author?.metadata?.name ? [post.metadata.author.metadata.name] : [],
      images: post.metadata?.featured_image ? [
        {
          url: `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            {post.metadata?.category && (
              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: post.metadata.category.metadata?.color || '#45B7D1' }}
              >
                {post.metadata.category.metadata?.name || post.metadata.category.title}
              </span>
            )}
            {post.metadata?.published_date && (
              <time className="text-gray-500 text-sm">
                {new Date(post.metadata.published_date).toLocaleDateString()}
              </time>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {post.title}
          </h1>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}
          
          {post.metadata?.author && (
            <div className="flex items-center space-x-4 mb-6">
              {post.metadata.author.metadata?.photo && (
                <img
                  src={`${post.metadata.author.metadata.photo.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                  className="w-15 h-15 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-lg">
                  {post.metadata.author.metadata?.name || post.metadata.author.title}
                </p>
                {post.metadata.author.metadata?.specialties && (
                  <p className="text-gray-500">
                    {post.metadata.author.metadata.specialties}
                  </p>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="mb-8">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.metadata?.content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-primary">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-primary">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 mt-6 text-primary">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 pl-6 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 pl-6 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-secondary pl-4 italic my-6 text-gray-600">{children}</blockquote>,
                code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                a: ({ children, href }) => <a href={href} className="text-secondary hover:text-secondary/80 underline">{children}</a>,
              }}
            >
              {post.metadata.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Tags */}
        {post.metadata?.tags && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag) => (
                <span
                  key={tag.trim()}
                  className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}