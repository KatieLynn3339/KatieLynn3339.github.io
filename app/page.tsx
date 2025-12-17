import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Hello! I'm Katie Lynn</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Welcome to my personal corner of the internet. I share my thoughts, experiences, and ideas through my blog. 
            Feel free to explore and get to know me better.
          </p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
          >
            Read My Blog
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">About Me</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
          <p>
            Hi! I'm Katie, and this is my personal website. I created this space to share my thoughts, 
            experiences, and the things I find interesting in life.
          </p>
          <p>
            When I'm not writing, you might find me reading, exploring new places, or just enjoying 
            a good conversation. I believe in the power of connecting with others and sharing our stories.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg border border-border bg-card p-8 space-y-4">
        <h2 className="text-2xl font-bold">Latest from my Blog</h2>
        <p className="text-muted-foreground">
          Check out my latest blog posts to see what I've been thinking about lately.
        </p>
        <Link 
          href="/blog"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2 font-medium hover:bg-primary/90 transition-colors"
        >
          View All Posts
        </Link>
      </section>
    </div>
  )
}
