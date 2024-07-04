import React from 'react'
import { HiOutlineShoppingCart, HiTrash, HiOutlineArrowCircleRight } from 'react-icons/hi'
import { Dropdown } from 'flowbite-react'
import { useCart } from '@/providers/CartContext'
import Button from '@/components/Button'
import Link from 'next/link'

const CartDropdown = () => {
  const { cart, clearCart } = useCart()

  return (
    <Dropdown
      label={<HiOutlineShoppingCart />}
      color="gray"
      dismissOnClick={false}
    >
      {cart.length === 0 && (
        <Dropdown.Item>
          No items in cart.
        </Dropdown.Item>
      )}
      {cart.map((product, index) => (
        <Dropdown.Item key={index} className="flex justify-between">
          <div className="font-bold text-wrap truncate">
            {product?.name}
          </div>
          <div className="ml-2">
            x {product?.quantity} : {Number(product?.quantity * product?.price).toFixed(2)} €
          </div>
        </Dropdown.Item>
      ))}
      <Dropdown.Divider />
      <Dropdown.Item className="flex justify-between gap-2">
        <Button icon={HiTrash} color="failure" onClick={() => clearCart()}>Empty cart</Button>
        <Link href="/cart">
          <Button icon={HiOutlineArrowCircleRight}>Go to cart</Button>
        </Link>
      </Dropdown.Item>
    </Dropdown>
  )
}

export default CartDropdown
