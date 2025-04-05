import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Meta } from '@/components/seo/meta';
import { globalMeta } from '@/components/seo/globalMeta';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import ContributeBanner from '@/components/sections/ContributeBanner';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className="min-h-screen flex flex-col antialiased">
        <SpeedInsights />
        <Meta 
          ogType='website'
          structuredData={structuredSeo}
        />
        <Header />
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
        <main className="flex-grow">
          {children}
        </main>
        <Analytics />
        <ContributeBanner />
        <Footer />
      </body>
    </html>
  )
}
