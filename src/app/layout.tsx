import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { GoogleAnalytics } from '@next/third-parties/google';
import { siteConfig } from '@/lib/constants';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Podólogo en Móstoles, Madrid`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'podólogo móstoles',
    'clínica podológica móstoles',
    'podología móstoles',
    'quiropodia móstoles',
    'plantillas ortopédicas móstoles',
    'estudio pisada móstoles',
    'podología deportiva móstoles',
    'uñas encarnadas móstoles',
    'pie diabético móstoles',
    'podólogo madrid sur',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 533,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/logo-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/logo-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/logo-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preload critical logo for faster LCP */}
        <link rel="preload" href="/images/logo-48.webp" as="image" type="image/webp" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? 'G-WE5THTZQ17'} />
    </html>
  );
}
