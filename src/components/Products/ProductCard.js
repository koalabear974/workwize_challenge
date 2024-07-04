import React from 'react'
import { Card, TextInput } from 'flowbite-react'
import { useCart } from '@/providers/CartContext'
import { HiOutlinePlus, HiTrash } from 'react-icons/hi'
import Button from '@/components/Button'

const ProductCard = ({ product }) => {
  const { cart, addItemToCart, removeItemFromCart, updateItemQuantity } = useCart()

  const cartProduct = cart.find((p) => p.id === product.id)
  const isInCart = !!cartProduct

  return (
    <Card
      className="max-w-sm"
      imgAlt={product.name}
      imgSrc={product.image}
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
      </a>
      <div>{product.description}</div>
      <div className="text-3xl pr-4 font-bold text-gray-900 dark:text-white">{product.price} €</div>
      <div className="flex items-center justify-end gap-2">
        {isInCart && (
          <TextInput className={'w-16'} type="number" min="1" value={cartProduct.quantity}
                     onChange={(e) => updateItemQuantity(product.id, e.target.value)} />
        )}
        {isInCart ? (
          <Button icon={HiTrash} color="failure" onClick={() => removeItemFromCart(product)}>
            Remove
          </Button>
        ) : (
          <Button icon={HiOutlinePlus} onClick={() => addItemToCart(product)}>
            Add to cart
          </Button>
        )}
      </div>
    </Card>
  )
}

export default ProductCard
