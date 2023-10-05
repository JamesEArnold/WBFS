import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Meta } from '@/components/seo/meta';
import { globalMeta } from '@/components/seo/globalMeta';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weisburn for Sheriff',
  description: 'The official site for the Stark County Republican Sheriff Representative Eric Weisburn.',
}

const structuredSeo = JSON.stringify({
  "@context": globalMeta.siteUrl,
  "description": "The Website of Stark County Sheriff Representative Eric Weisburn."
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
      <Meta 
        ogType='website'
        structuredData={structuredSeo}
      />
      <header className="sticky top-0 z-50 shadow-md">
        <MainNav />
      </header>
        {children}
      <Footer />
      </body>
    </html>
  )
}
