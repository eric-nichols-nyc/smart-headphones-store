'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b border-gray-800 bg-gradient-to-r from-black/45 via-gray-900/45 to-black/45 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-white">Smart Headphones Store</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/products" className="text-gray-200 hover:text-white transition-colors">Products</Link>
            <Link href="/assistant" className="text-gray-200 hover:text-white transition-colors">AI Assistant</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="outline" size="sm" className="text-gray-200 border-gray-700 hover:bg-gray-800">
            Cart (0)
          </Button>
        </div>
      </div>
    </header>
  )
}