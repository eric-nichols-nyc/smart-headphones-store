const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'http://localhost:3001';

export async function GET() {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/api/products`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();

    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return Response.json(
      { 
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}