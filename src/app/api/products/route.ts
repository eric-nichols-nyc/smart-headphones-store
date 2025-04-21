const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'https://products-api-jade.vercel.app';

// Fallback data for build time
const fallbackProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    image_url: '/images/headphones-1',
    category: 'wireless',
    sku: 'WH-1000',
    stock_quantity: 10
  },
  {
    id: '2',
    name: 'Sport Earbuds',
    description: 'Wireless earbuds perfect for workouts and sports',
    price: 149.99,
    image_url: '/images/headphones-2',
    category: 'sports',
    sku: 'SE-2000',
    stock_quantity: 15
  }
];

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/api/products`);
    
    if (!response.ok) {
      console.warn('Failed to fetch products from API, using fallback data');
      return Response.json(fallbackProducts);
    }

    const products = await response.json();
    return Response.json(products);
  } catch (error) {
    console.warn('Error fetching products:', error);
    // Return fallback data if the API request fails
    return Response.json(fallbackProducts);
  }
}