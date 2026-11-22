import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { globalMeta } from '@/components/seo/globalMeta';
import { draftMode } from 'next/headers';
import { SiteAnnouncement, SiteFooter, SiteHeader } from '@/components/site-chrome';
import { PreviewBar } from '@/components/ui/preview-bar';
import { RefreshOnSave } from '@/components/ui/refresh-on-save';
import { getSiteSettings } from '@/lib/cms/public';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  metadataBase: new URL(globalMeta.siteUrl),
  title: 'Weisburn for Sheriff',
  description: 'The official site for the Stark County Republican Sheriff Representative Eric Weisburn.',
  verification: { google: '9J5nLPwwmIYa-i-ryNRJ10p0pB0wFeXk9IFXk5Ff1Mw' },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: globalMeta.siteName,
    url: globalMeta.siteUrl,
    description: globalMeta.description,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings();
  const preview = (await draftMode()).isEnabled;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
      <SpeedInsights />
      <header className="sticky top-0 z-50 shadow-md">
        <SiteHeader settings={settings} />
        <SiteAnnouncement settings={settings} />
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
      <SiteFooter settings={settings} />
      {preview && <PreviewBar />}
      {preview && <RefreshOnSave />}
      </body>
    </html>
  )
}
