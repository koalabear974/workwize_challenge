"use client"
import React from 'react'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Navigation/Loading'
import { CartProvider } from '@/providers/CartContext'
import Navigation from '@/components/Navigation/Navigation'
import CartTable from '@/components/Cart/CartTable'
import Header from '@/components/Navigation/Header'
import CartConfirm from '@/components/Cart/CartConfirm'

const CartPage = () => {
  const {user, loading} = useAuth({
    middleware: 'supplier',
    redirectIfAuthenticated: '/products'
  })

  if (!user && loading) {
    return <Loading />
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navigation user={user}/>

        <main className="flex flex-col flex-1 container px-2 md:px-0 mx-auto gap-4 py-4">
          <Header title="Cart" />
          <CartTable />
          <CartConfirm />
        </main>
      </div>
    </CartProvider>
  )
}

export default CartPage
