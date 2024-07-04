'use client'
import React from 'react'
import Loading from '@/components/Navigation/Loading'
import { Badge, List, Select, Table } from 'flowbite-react'
import { TableTheme } from '@/components/Products/ProductTable'
import { fetchAllOrders, updateOrderStatus } from '@/providers/OrderService'
import { useAuth } from '@/hooks/auth'

const OrderTable = () => {
  const { user } = useAuth()
  const { orders, loading, error, mutate } = fetchAllOrders()

  if (loading) return (<Loading fullscreen={false} />)
  if (error) return (<div>{error}</div>)

  const getBadgeColor = (status) => {
    if (status === 'completed') return 'success'
    if (status === 'cancelled') return 'failure'
    return 'gray'
  }
  return (
    <div className="h-full flex-1 flex flex-col">
      <Table hoverable className="w-full flex-1" theme={TableTheme}>
        <Table.Head>
          <Table.HeadCell>Order #</Table.HeadCell>
          <Table.HeadCell>Order Items</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {orders?.map((order,index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order?.id}
              </Table.Cell>
              <Table.Cell>
                <List>
                  {order?.order_items?.map((item) => (
                    <List.Item key={item.id}> {item.product.name} x {item.quantity}</List.Item>
                  ))}
                </List>
              </Table.Cell>
              <Table.Cell className="font-bold">
                {Number(order?.order_items?.reduce((total, item) => total + item.quantity * item.product.price, 0)).toFixed(2)} €
              </Table.Cell>
              <Table.Cell>
                {['user'].includes(user?.role) && (
                  <Badge className="capitalize flex justify-center"
                         color={getBadgeColor(order?.status)}>{order?.status}</Badge>
                )}
                {['supplier', 'admin'].includes(user?.role) && (
                  <Select
                    value={order?.status}
                    className="capitalize flex justify-center"
                    color={getBadgeColor(order?.status)}
                    onChange={(e) => updateOrderStatus({status: e.target.value, id: order?.id }).then(() => mutate())}
                  >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                  </Select>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {orders?.length === 0 && (
        <Table hoverable className="w-full flex-1">
          <Table.Body>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="p-4 text-center"> No orders.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}

    </div>
  )
}

export default OrderTable
