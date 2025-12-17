import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PostParams {
  slug: string
}

interface BlogPostFrontmatter {
  title: string
  date: string
  excerpt?: string
}

async function getPost(slug: string): Promise<{ frontmatter: BlogPostFrontmatter; content: string } | null> {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
  
    // Parse frontmatter
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)/
    const match = fileContent.match(frontmatterRegex)
    
    if (!match) {
      return null
    }

    const [, frontmatterContent, content] = match
    
    const titleMatch = frontmatterContent.match(/title:\s*"?([^"\n]+)"?/)
    const dateMatch = frontmatterContent.match(/date:\s*"?([^"\n]+)"?/)
    const excerptMatch = frontmatterContent.match(/excerpt:\s*"?([^"\n]+)"?/)

    return {
      frontmatter: {
        title: titleMatch ? titleMatch[1] : slug,
        date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
        excerpt: excerptMatch ? excerptMatch[1] : undefined,
      },
      content: content.trim(),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

async function getPostSlugs(): Promise<string[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  try {
    const fileNames = await fs.readdir(postsDirectory)
    return fileNames
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading post slugs:', error)
    return []
  }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: PostParams }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.frontmatter.title} - Katie Lynn`,
    description: post.frontmatter.excerpt || 'Read this blog post',
  }
}

export default async function BlogPost({ params }: { params: PostParams }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-8">
      <div className="space-y-4">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to blog
        </Link>
        <div>
          <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <time className="text-muted-foreground">
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      <div className="prose prose-invert max-w-none dark:prose-invert">
        {/* Render markdown content as HTML */}
        <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  )
}
