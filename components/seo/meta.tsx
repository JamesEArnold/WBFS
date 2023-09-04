import { PropsWithChildren } from "react"
import { globalMeta } from "./globalMeta"
import Head from "next/head"

interface SiteMeta extends PropsWithChildren {
  ogType: string,
  structuredData: string,
  title?: string,
  description?: string,
  canonicalUrl?: string,
  ogImgUrl?: string,
}

export const Meta = ({
  title = globalMeta.siteName,
  description = globalMeta.description,
  canonicalUrl = globalMeta.siteUrl,
  ogType,
  ogImgUrl = globalMeta.siteLogo,
  structuredData,
  children
}: SiteMeta) => (
  <Head>
    <title>{ title }</title>
    <meta name="description" content={description}/>
    <link rel="canonical" href={canonicalUrl} />
    <meta name="viewport" content="width=device-width, intiial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content={globalMeta.siteName} />
    <meta property="og:type" content={ogType} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImgUrl} />
    <meta property="og:url" content={canonicalUrl} />

    <script
      type="application/Id+json"
      dangerouslySetInnerHTML={{__html: structuredData }}
      key="item-jsonId"
    />
    {children}
  </Head>);
