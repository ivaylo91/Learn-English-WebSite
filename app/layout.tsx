import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ServiceWorkerProvider from "@/components/providers/ServiceWorkerProvider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = 'https://uchi-angliyski.vercel.app';

export const viewport: Viewport = {
  themeColor:        '#e8633a',
  width:             'device-width',
  initialScale:      1,
  minimumScale:      1,
  viewportFit:       'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  manifest:     '/manifest.webmanifest',
  title: {
    default:  'Учи Английски',
    template: '%s | Учи Английски',
  },
  appleWebApp: {
    capable:         true,
    statusBarStyle:  'default',
    title:           'Учи Английски',
  },
  formatDetection: { telephone: false },
  description:
    'Безплатна платформа за изучаване на английски с речник, граматика, слушане и четене — всичко на български.',
  keywords: [
    'учи английски', 'английски за българи', 'английски онлайн',
    'английски речник', 'английска граматика', 'слушане английски',
    'четене английски', 'флаш карти', 'learn English Bulgarian',
  ],
  authors: [{ name: 'Учи Английски' }],
  openGraph: {
    siteName:    'Учи Английски',
    locale:      'bg_BG',
    type:        'website',
    url:         BASE_URL,
    title:       'Учи Английски — безплатна платформа на български',
    description: 'Речник с флаш карти, граматика, слушане и четене. Всичко на едно място с интерфейс на български.',
    images: [
      {
        url:    '/og.png',
        width:  1200,
        height: 630,
        alt:    'Учи Английски — безплатна платформа за изучаване на английски',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Учи Английски — безплатна платформа на български',
    description: 'Речник с флаш карти, граматика, слушане и четене. Всичко на едно място.',
    images:      ['/og.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const themeScript = `
try {
  var s = localStorage.getItem('theme');
  var p = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if ((s || p) === 'dark') document.documentElement.classList.add('dark');
} catch(e) {}
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${bricolage.variable} ${manrope.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", background: "var(--bg)" }}
      >
        <ThemeProvider>
          <AuthProvider>
            <ServiceWorkerProvider />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
