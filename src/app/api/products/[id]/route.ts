const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL || 'https://products-api-jade.vercel.app';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('API Route - Fetching product with ID:', params.id);
  console.log('API Route - Using URL:', `${PRODUCTS_API_URL}/api/products/${params.id}`);

  try {
    const response = await fetch(`${PRODUCTS_API_URL}/api/products/${params.id}`);
    console.log('API Route - Response status:', response.status);
    
    if (!response.ok) {
      console.error('API Route - Product not found:', response.statusText);
      return Response.json(
        { error: 'Product not found', details: response.statusText },
        { status: 404 }
      );
    }

    const product = await response.json();
    console.log('API Route - Successfully fetched product:', product);
    return Response.json(product);
  } catch (error) {
    console.error('API Route - Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 