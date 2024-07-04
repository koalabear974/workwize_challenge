"use client"
import React from 'react'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Navigation/Loading'
import { CartProvider } from '@/providers/CartContext'
import Navigation from '@/components/Navigation/Navigation'
import Header from '@/components/Navigation/Header'
import OrderTable from '@/components/Orders/OrderTable'

const CartPage = () => {
  const {user, loading} = useAuth({ middleware: 'auth' })

  if (!user && loading) {
    return <Loading />
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navigation user={user}/>

        <main className="flex flex-col flex-1 container px-2 md:px-0 mx-auto gap-4 py-4">
          <Header title="Orders" />
          <OrderTable />
        </main>
      </div>
    </CartProvider>
  )
}

export default CartPage
