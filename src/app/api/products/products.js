
export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/products/')
    const data = await response.json()
    
    const products = data.products;
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
    })
  }
}