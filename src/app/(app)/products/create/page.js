import React from 'react'
import Header from "@/components/Navigation/Header"
import ProductForm from '@/components/Forms/ProductForm'

const ProductCreatepage = () => {
  return (
    <div className="flex flex-col container px-2 md:px-0 mx-auto gap-4">
      <Header title="Create a Product"/>

      <ProductForm />
    </div>
  )
}

export default ProductCreatepage
