import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'North Lusitanos · Selas em Segunda Mão',
  description: 'Selas de dressage e salto em segunda mão, selecionadas com rigor. North Lusitanos · Portugal.',
  keywords: 'selas segunda mão, selas dressage, selas salto, selas usadas Portugal, equitação',
  authors: [{ name: 'North Lusitanos' }],
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'North Lusitanos',
    title: 'North Lusitanos · Selas em Segunda Mão',
    description: 'Selas de dressage e salto em segunda mão, selecionadas com rigor.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${libreBaskerville.className} bg-white text-[#182A47] leading-relaxed`}>
        {children}
      </body>
    </html>
  )
}
