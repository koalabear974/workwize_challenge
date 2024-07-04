import useSWR from 'swr'
import axios from '@/lib/axios'

const fetcher = url => axios.get(url).then(res => res.data)

export const fetchAllProducts = () => {
  const { data, error, mutate } = useSWR('/api/products', fetcher)

  return {
    products: data,
    loading: !error && !data,
    error,
    mutate,
  }
}

export const fetchProduct = (id) => {
  const { data, error, mutate } = useSWR(`/api/products/${id}`, fetcher)

  return {
    product: data,
    loading: !error && !data,
    error,
    mutate,
  }
}

export const fetchUserProducts = () => {
  const { data, error, mutate } = useSWR('/api/supplier/products', fetcher)

  return {
    products: data,
    loading: !error && !data,
    error,
    mutate,
  }
}

export const createProduct = async ({ setErrors, setStatus, ...props }) => {
  setErrors([])
  setStatus(null)

  axios
    .post('/api/products', props)
    .then(() =>  setStatus('Product created successfully.'))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(error.response.data.errors)
    })
}

export const updateProduct = async ({ setErrors, setStatus, ...props }) => {
  setErrors([])
  setStatus(null)

  axios
    .put(`/api/products/${props.id}`, props)
    .then(() =>  setStatus('Product was updated successfully.'))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(error.response.data.errors)
    })
}
export const deleteProduct = async ({ setErrors = () => {}, setStatus = () => {}, ...props }) => {
  setErrors([])
  setStatus(null)

  axios
    .delete(`/api/products/${props.id}`, props)
    .then(() =>  setStatus('Product was deleted successfully.'))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(error.response.data.errors)
    })
}
