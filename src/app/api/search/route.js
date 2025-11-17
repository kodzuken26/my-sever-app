
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    
    if (!q) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }
    
    const response = await fetch(`https://dummyjson.com/products/search?q=${q}`)
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}