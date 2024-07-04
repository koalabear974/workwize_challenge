import React from 'react'
import { Table, TextInput } from 'flowbite-react'
import Button from '@/components/Button'
import { HiTrash } from 'react-icons/hi'
import { useCart } from '@/providers/CartContext'
import { TableTheme } from '@/components/Products/ProductTable'

const CartTable = () => {
  const { cart, removeItemFromCart, updateItemQuantity } = useCart()

  return (
    <div>
      <Table hoverable className="w-full flex-1" theme={TableTheme}>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell className="hidden md:block">Price/unit</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {cart?.map((product, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product?.name}
              </Table.Cell>
              <Table.Cell>{product?.stock}</Table.Cell>
              <Table.Cell className="hidden md:block">{product?.price} €/unit</Table.Cell>
              <Table.Cell className="font-bold">{Number(product?.quantity * product?.price).toFixed(2)} €</Table.Cell>
              <Table.Cell className="flex max-w-[inherit]">
                <div className="ml-auto flex gap-2">
                  <TextInput className={'w-16'} type="number" min="1" value={product.quantity}
                             onChange={(e) => updateItemQuantity(product.id, e.target.value)} />
                  <Button
                    icon={HiTrash}
                    color="failure"
                    onClick={() => removeItemFromCart(product)}
                  >
                    Remove
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {cart?.length === 0 && (
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

export default CartTable
