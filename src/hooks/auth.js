import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({middleware, redirectIfAuthenticated} = {}) => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)

  const fetchUser = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      if (error.response.status !== 409) throw error
      router.push('/verify-email')
    } finally {
      setLoading(false)
    }
  }

  const { data: user, error, mutate } = useSWR('/api/user', fetchUser, {
    revalidateOnFocus: false,
  })

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({setErrors, ...props}) => {
    await csrf()

    setErrors([])

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async ({setErrors, setStatus, ...props}) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async ({setErrors, setStatus, email}) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/forgot-password', {email})
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async ({setErrors, setStatus, ...props}) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/reset-password', {token: params.token, ...props})
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = ({setStatus}) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate())
      localStorage.setItem('cart', [])
    }

    if (window && window.location) {
      window.location.pathname = '/login'
    }
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)
    if (middleware === 'supplier' && redirectIfAuthenticated && user?.role === 'supplier')
      router.push(redirectIfAuthenticated)
    if (
      window && window.location && window.location.pathname === '/verify-email' &&
      user?.email_verified_at
    )
      router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
    if (user || error) { setLoading(false) }
  }, [user, error])

  return {
    user,
    loading,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
