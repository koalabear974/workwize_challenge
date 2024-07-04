"use client"
import Loading from "@/components/Navigation/Loading";
import { deleteProduct, fetchUserProducts } from '@/services/ProductService'
import { Button, Table } from 'flowbite-react'
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import Link from 'next/link'

const TableTheme = {
  "body": {
    "cell": {
      "base": "px-2 md:px-6 py-1 md:py-4 text-wrap truncate max-w-[100px] md:max-w-full group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg"
    }
  },
  "head": {
    "cell": {
      "base": "px-2 md:px-6 py-2 md:py-4 bg-gray-50 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
    }
  },
}

const ProductList = () => {
  const {products, loading, error, mutate} = fetchUserProducts();

  if (loading) return (<Loading fullscreen={false}/>)
  if (error) return (<div>{error}</div>)

  return (
    <div className="h-full flex-1 flex flex-col">
      <Table hoverable className="w-full flex-1" theme={TableTheme}>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products?.map((product) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product?.name}
              </Table.Cell>
              <Table.Cell>{product?.stock}</Table.Cell>
              <Table.Cell>{product?.price}</Table.Cell>
              <Table.Cell className="flex gap-2 max-w-[inherit]">
                <Link href={`/products/${product.id}`}>
                  <Button color="gray">
                    <span className="hidden md:block">
                      Edit
                    </span>
                    <HiOutlinePencilAlt className="Button--icon" />
                  </Button>
                </Link>
                <Button color="failure" onClick={() => deleteProduct({ id: product.id }).then(() => mutate())}>
                  <span className="hidden md:block">
                    Delete
                  </span>
                  <HiTrash className="Button--icon" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {products?.length === 0 && (
        <Table hoverable className="w-full flex-1">
          <Table.Body>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="p-4 text-center"> No products.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}

    </div>
  );
};

export default ProductList;
