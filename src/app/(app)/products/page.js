import ProductTable from '@/components/Products/ProductTable'
import { HiOutlinePlus } from 'react-icons/hi'
import Link from 'next/link'
import Header from '@/components/Navigation/Header'
import Button from '@/components/Button'


const ProductsPage = () => {
  return (
    <div className="flex flex-col container px-2 md:px-0 mx-auto gap-4">
      <Header title="Product Page" />

      <div className="flex justify-end">
        <Link href="/products/create">
          <Button icon={HiOutlinePlus}>
            Create a Product
          </Button>
        </Link>
      </div>
      <ProductTable />
    </div>
  )
}

export default ProductsPage
