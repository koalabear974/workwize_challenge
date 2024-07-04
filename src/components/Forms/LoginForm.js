import React, { useEffect, useState } from 'react'

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/auth"
import FormStatus from "@/components/Forms/FormStatus"
import {
  Button,
  Label,
} from "flowbite-react"
import TextInput from "@/components/Forms/TextInput"

const LoginForm = () => {
  const router = useRouter()

  const {login} = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const submitForm = async event => {
    event.preventDefault()

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  })

  return (
    <>
      <FormStatus className="mb-4" status={status}/>

      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>

          <TextInput
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={event => setEmail(event.target.value)}
            required
            autoFocus
            error={errors.email}
          />

        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>

          <TextInput
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={event => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            error={errors.password}
          />
        </div>

        {/* Remember Me */}
        <div className="block mt-4">
          <label
            htmlFor="remember_me"
            className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={event =>
                setShouldRemember(event.target.checked)
              }
            />

            <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className="ml-3" type="submit">Login</Button>
        </div>
      </form>
    </>

  )
}

export default LoginForm
