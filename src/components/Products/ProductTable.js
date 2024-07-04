'use client'
import Loading from '@/components/Navigation/Loading'
import { deleteProduct, fetchUserProducts } from '@/providers/ProductService'
import { Table } from 'flowbite-react'
import { HiTrash, HiOutlinePencilAlt } from 'react-icons/hi'
import Link from 'next/link'
import Button from '@/components/Button'

export const TableTheme = {
  'body': {
    'cell': {
      'base': 'px-2 md:px-6 py-1 md:py-4 text-wrap truncate max-w-[100px] md:max-w-full group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg',
    },
  },
  'head': {
    'cell': {
      'base': 'px-2 md:px-6 py-2 md:py-4 bg-gray-50 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700',
    },
  },
}

const ProductTable = () => {
  const { products, loading, error, mutate } = fetchUserProducts()

  if (loading) return (<Loading fullscreen={false} />)
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
          {products?.map((product, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product?.name}
              </Table.Cell>
              <Table.Cell>{product?.stock}</Table.Cell>
              <Table.Cell>{product?.price}</Table.Cell>
              <Table.Cell className="flex max-w-[inherit]">
                <div className="flex gap-2 ml-auto">
                  <Link href={`/products/${product.id}`}>
                    <Button icon={HiOutlinePencilAlt} color="gray">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    icon={HiTrash}
                    color="failure"
                    onClick={() => deleteProduct({ id: product.id }).then(() => mutate())}
                  >
                    Delete
                  </Button>
                </div>
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
  )
}

export default ProductTable
