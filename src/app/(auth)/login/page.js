'use client'

import Link from 'next/link'
import LoginForm from "@/components/Forms/LoginForm"
import { Button, HR } from "flowbite-react"

const Login = () => {
  return (
    <>
      <LoginForm/>
      <HR />
      <div className="mt-4 flex justify-between items-center">
        <div>
          Not registered?
        </div>
        <Link href={"/register"}><Button>Create an account</Button></Link>
      </div>
    </>
  )
}

export default Login
