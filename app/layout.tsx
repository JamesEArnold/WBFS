import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Meta } from '@/components/seo/meta';
import { globalMeta } from '@/components/seo/globalMeta';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weisburn for Sheriff',
  description: 'The official site for the Stark County Republican Sheriff Representative Eric Weisburn.',
  verification: { google: '9J5nLPwwmIYa-i-ryNRJ10p0pB0wFeXk9IFXk5Ff1Mw' }
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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={`${inter.className}`}>
      <Meta 
        ogType='website'
        structuredData={structuredSeo}
      />
      <header className="sticky top-0 z-50 shadow-md">
        <MainNav />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </header>
        {children}
        <Analytics />
      <Footer />
      </body>
    </html>
  )
}
