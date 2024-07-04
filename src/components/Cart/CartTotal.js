import React from 'react'
import { useCart } from '@/providers/CartContext'

const CartTotal = () => {
  const { cart } = useCart()
  const total = Number(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)

  return (
    <div className="text-xl font-bold">Total: {total} €</div>
  )
}

export default CartTotal
