import React, { useState } from 'react'
import { useCart } from '@/providers/CartContext'
import { HiOutlineCheck } from 'react-icons/hi'
import Button from '@/components/Button'
import { createOrder } from '@/providers/OrderService'
import CartTotal from '@/components/Cart/CartTotal'
import FormStatus from '@/components/Forms/FormStatus'

const CartConfirm = () => {
  const { cart, clearCart } = useCart()
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState('')

  return (
    <>
      <div className="flex w-full justify-end items-center gap-4">
        <CartTotal />
        <Button icon={HiOutlineCheck} color="success" onClick={() => {
          createOrder({ cart, setErrors, setStatus, callback: () => clearCart() })
        }}>
          Confirm order
        </Button>
      </div>
      <FormStatus className="mt-4" status={status} errors={errors} />
    </>
  )
}

export default CartConfirm
