import React from 'react'
import { fetchAllProducts } from '@/providers/ProductService'
import Loading from '@/components/Navigation/Loading'
import ProductCard from '@/components/Products/ProductCard'

const ProductDisplay = () => {
  const { products, loading, error } = fetchAllProducts()

  if (loading) return (<Loading fullscreen={false} />)
  if (error) return (<div>{error}</div>)
  if (products.length === 0) return (
    <div className="w-full flex-1 text-xl font-bold flex justify-center items-center">No products</div>)

  return (
    <div className="container px-2 md:px-0 py-2 md:py-4 mx-auto h-full flex-1 flex flex-wrap gap-2 md:gap-4 justify-center">
      {products?.map((product) => (<ProductCard key={product.id} product={product} />))}
    </div>
  )
}

export default ProductDisplay
