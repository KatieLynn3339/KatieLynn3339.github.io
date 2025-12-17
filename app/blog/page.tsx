import Link from 'next/link'
import fs from 'fs'
import path from 'path'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))
  
  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    // Parse frontmatter
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/
    const match = fileContent.match(frontmatterRegex)
    
    if (!match) {
      return null
    }
    
    const frontmatterContent = match[1]
    const titleMatch = frontmatterContent.match(/title:\s*"?([^"\n]+)"?/)
    const dateMatch = frontmatterContent.match(/date:\s*"?([^"\n]+)"?/)
    const excerptMatch = frontmatterContent.match(/excerpt:\s*"?([^"\n]+)"?/)
    
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
      excerpt: excerptMatch ? excerptMatch[1] : 'No excerpt provided',
    }
  }).filter(Boolean) as BlogPost[]
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const metadata = {
  title: 'Blog - Katie Lynn',
  description: 'Read my latest blog posts',
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts, stories, and ideas from Katie Lynn
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="space-y-2 p-4 rounded-lg border border-border hover:border-primary transition-colors bg-card hover:bg-accent/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
