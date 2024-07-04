import ProductList from "@/components/Products/ProductList";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";
import Header from "@/components/Navigation/Header";


const ProductsPage = () => {
  return (
      <div className="flex flex-col container mx-auto gap-4">
        <Header title="Product Page" />

        <div className="flex justify-end">
          <Link href="/products/create">
            <Button>
              <span className="hidden md:block">
                Create a Product
              </span>
              <HiOutlinePlus className="Button--icon" />
            </Button>
          </Link>
        </div>
        <ProductList />
      </div>
  )
}

export default ProductsPage
