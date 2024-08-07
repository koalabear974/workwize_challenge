"use client"
import { useAuth } from "@/hooks/auth"
import LoginForm from "@/components/Forms/LoginForm"
import AuthCard from "@/app/(auth)/AuthCard"
import { Button, HR } from "flowbite-react"
import Link from "next/link"
import Navigation from "@/components/Navigation/Navigation"
import Loading from "@/components/Navigation/Loading"
import ProductDisplay from "@/components/Products/ProductDisplay"
import { CartProvider } from '@/providers/CartContext'

const Home = () => {
  const {user, loading} = useAuth({
    middleware: 'supplier',
    redirectIfAuthenticated: '/products'
  })

  if (!user && loading) {
    return <Loading />
  }

  if (!user) {
    return (
      <div
        className="text-gray-900 antialiased min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <AuthCard>
          <LoginForm/>
          <HR />
          <div className="flex justify-between items-center">
            <div>
              Not registered?
            </div>
            <Link href={"/register"}><Button>Create an account</Button></Link>
          </div>
        </AuthCard>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navigation user={user}/>

        <main className="flex flex-col flex-1">
          <ProductDisplay />
        </main>
      </div>
    </CartProvider>
  )
}

export default Home
