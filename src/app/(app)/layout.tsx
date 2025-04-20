import type { Metadata } from 'next'
import { Header } from '@/components/Header'


export const metadata: Metadata = {
  title: 'Smart Headphones Store',
  description: 'AI-powered headphone recommendations and shopping experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main>
        <Header />
        {children}
      </main>
  )
}