import useSWR from 'swr'
import axios from '@/lib/axios'

const fetcher = url => axios.get(url).then(res => res.data)

export const createOrder = async ({ setErrors, setStatus, callback, ...props }) => {
  setErrors([])
  setStatus(null)

  axios
    .post('/api/orders', props)
    .then(() =>  setStatus('Order created successfully.'))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(error.response.data.errors)
    })
    .finally(() => callback())
}

export const fetchAllOrders = () => {
  const { data, error, mutate } = useSWR('/api/orders', fetcher)

  return {
    orders: data,
    loading: !error && !data,
    error,
    mutate,
  }
}

export const updateOrderStatus = async ({ setErrors = () => {}, setStatus = () => {}, ...props }) => {
  setErrors([])
  setStatus(null)

  axios
    .patch(`/api/orders/${props.id}/status`, props)
    .then(() =>  setStatus('Product was updated successfully.'))
    .catch(error => {
      if (error.response.status !== 422) throw error

      setErrors(error.response.data.errors)
    })
}

