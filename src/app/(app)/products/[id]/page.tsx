import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShinyButton } from '@/components/ui/shiny-button'
import { formatPrice } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  sku: string
  stock_quantity: number
}

async function getProduct(id: string): Promise<Product> {
  const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'https://products-api-jade.vercel.app'
  
  try {
    console.log(`Fetching product with ID: ${id}`)
    console.log(`API URL: ${PRODUCTS_API_URL}/api/products/${id}`)
    
    const response = await fetch(`${PRODUCTS_API_URL}/api/products/${id}`, {
      next: { revalidate: 60 }
    })
    
    if (!response.ok) {
      console.error(`Failed to fetch product. Status: ${response.status}`)
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const product = await response.json()
    console.log('Fetched product:', product)
    return product
  } catch (error) {
    console.error('Error in getProduct:', error)
    notFound()
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  console.log('Rendering product page with params:', params)
  const product = await getProduct(params.id)
  const isInStock = product.stock_quantity > 0

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/products"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 mt-8">
          {/* Image Section - 60% */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-900">
            <Image
              src={`${product.image_url}.png`}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>

          {/* Content Section - 40% */}
          <div className="flex flex-col p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-2xl text-blue-400 mb-4">{formatPrice(product.price)}</p>
              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-block h-3 w-3 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm ${isInStock ? 'text-green-500' : 'text-red-500'}`}>
                  {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">{product.description}</p>
              
              {/* Product Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">SKU</span>
                  <span className="text-white">{product.sku}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <ShinyButton 
                className="w-full text-lg py-6" 
                disabled={!isInStock}
              >
                Add to Cart
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 