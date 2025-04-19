import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock_quantity: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, description, price, image_url, stock_quantity } = product

  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">${price}</p>
          <p className={`text-sm ${stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={stock_quantity === 0}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}