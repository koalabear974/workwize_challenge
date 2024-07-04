'use client'
import Header from '@/components/Navigation/Header'
import { fetchProduct } from '@/providers/ProductService'
import Loading from '@/components/Navigation/Loading'
import ProductForm from '@/components/Forms/ProductForm'

const ProductEditPage = ({ params }) => {
  const { product, loading, error } = fetchProduct(params.slug)

  if (loading) return (<Loading fullscreen={false} />)
  if (error) return (<div>{error}</div>)

  return (
    <div className="flex flex-col container px-2 md:px-0 mx-auto gap-4">
      <Header title="Product Edit Page" />
      <ProductForm product={product} />
    </div>
  )
}

export default ProductEditPage
