'use client'

import {
  Button,
  Label,
  Select,
} from "flowbite-react"
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import TextInput from "@/components/Forms/TextInput"

const Page = () => {
  const {register} = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [role, setRole] = useState('user')
  const [errors, setErrors] = useState([])

  const submitForm = event => {
    event.preventDefault()

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role,
      setErrors,
    })
  }

  return (
    <form onSubmit={submitForm}>
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>

        <TextInput
          id="name"
          type="text"
          value={name}
          className="block mt-1 w-full"
          onChange={event => setName(event.target.value)}
          required
          autoFocus
          error={errors.name}
        />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>

        <TextInput
          id="email"
          type="email"
          value={email}
          className="block mt-1 w-full"
          onChange={event => setEmail(event.target.value)}
          required
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
          autoComplete="new-password"
          error={errors.password}
        />

      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <Label htmlFor="passwordConfirmation">
          Confirm Password
        </Label>

        <TextInput
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          className="block mt-1 w-full"
          onChange={event =>
            setPasswordConfirmation(event.target.value)
          }
          required
          error={errors.password_confirmation}
        />
      </div>

      {/* Select role */}
      <div className="mt-4">
        <Label htmlFor="passwordConfirmation">
          Role
        </Label>

        <Select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="supplier">Supplier</option>
        </Select>
      </div>

      <div className="flex items-center justify-end mt-4">
        <Link
          href="/login"
          className="underline text-sm text-gray-600 hover:text-gray-900">
          Already registered?
        </Link>

        <Button className="ml-4" type="submit">Register</Button>
      </div>
    </form>
  )
}

export default Page
