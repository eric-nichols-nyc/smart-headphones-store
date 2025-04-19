import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Smart Headphones Store</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/products">Products</Link>
            <Link href="/assistant">AI Assistant</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="outline" size="sm">
            Cart (0)
          </Button>
        </div>
      </div>
    </header>
  )
}