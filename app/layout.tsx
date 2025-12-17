import type { Metadata } from 'next'
import Link from 'next/link'
import { ThemeToggle } from './components/theme-toggle'
import { ThemeProvider } from './components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Katie Lynn',
  description: 'Personal website and blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
                  Katie Lynn
                </Link>
                <div className="hidden sm:flex gap-6">
                  <Link href="/" className="text-sm hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/blog" className="text-sm hover:text-primary transition-colors">
                    Blog
                  </Link>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </nav>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
          <footer className="border-t border-border bg-background mt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Katie Lynn. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
