/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-script-in-head */
import '@/css/tailwind.css'
import '@/css/prism.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

import { useEffect } from 'react'
import { Router, useRouter } from 'next/router'
import Script from 'next/script'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

import TagManager from 'react-gtm-module'

export default function App({ Component, pageProps }) {
  // Google Tag Manager start
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-55HQ457' })
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])
  // Google Tag Manager end

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
