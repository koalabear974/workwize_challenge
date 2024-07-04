"use client"
import ProductList from "@/components/Products/ProductList";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";
import Header from "@/components/Navigation/Header";
import { fetchProduct, fetchUserProducts } from '@/services/ProductService'
import Loading from '@/components/Navigation/Loading'
import ProductForm from '@/components/Forms/ProductForm'

const ProductEditPage = ({params}) => {
  const {product, loading, error} = fetchProduct(params.slug);

  if (loading) return (<Loading fullscreen={false}/>)
  if (error) return (<div>{error}</div>)

  console.log('product : ', product)

  return (
      <div className="flex flex-col container mx-auto gap-4">
        <Header title="Product Edit Page" />
        <ProductForm product={product}/>
      </div>
  )
}

export default ProductEditPage
