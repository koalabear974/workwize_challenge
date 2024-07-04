"use client"
import React, { useState } from 'react'

import FormStatus from "@/components/Forms/FormStatus"
import {
  Button,
  Label, Textarea,
} from "flowbite-react"
import TextInput from "@/components/Forms/TextInput"
import { HiOutlineCurrencyEuro } from 'react-icons/hi'
import { createProduct, updateProduct } from '@/providers/ProductService'

const ProductForm = ( {product = null}) => {
  const submitForm = async event => {
    event.preventDefault()
    if (product) {
      updateProduct({
        id: product.id,
        name,
        description,
        image,
        stock,
        price,
        setErrors,
        setStatus
      })
      return
    }

    createProduct({
      name,
      description,
      image,
      stock,
      price,
      setErrors,
      setStatus
    })
  }

  const [name, setName] = useState(product?.name)
  const [description, setDescription] = useState(product?.description)
  const [image, setImage] = useState(product?.image || '/placeholder.png')
  const [stock, setStock] = useState(product?.stock || 1)
  const [price, setPrice] = useState(product?.price || 0.01)

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  return (
    <>
      <FormStatus status={status} errors={Object.keys(errors).map(e => errors[e])} />

      <form onSubmit={submitForm} className="gap-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <TextInput
            id="name"
            value={name}
            className="block mt-1 w-full"
            onChange={event => setName(event.target.value)}
            autoFocus
            required
            error={errors.name}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            row={3}
            id="description"
            value={description}
            className="block mt-1 w-full"
            onChange={event => setDescription(event.target.value)}
            required
            error={errors.description}
          />
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <TextInput
            id="image"
            value={image}
            className="block mt-1 w-full"
            onChange={event => setImage(event.target.value)}
            required
            autoFocus
            error={errors.image}
          />
        </div>

        <div>
          <Label htmlFor="name">Product Stock</Label>
          <TextInput
            id="stock"
            type="number"
            min="1"
            value={stock}
            className="block mt-1 w-full"
            onChange={event => setStock(event.target.value)}
            required
            autoFocus
            error={errors.stock}
          />
        </div>

        <div>
          <Label htmlFor="name">Product Price</Label>
          <TextInput
            id="price"
            type="number"
            value={price}
            className="block mt-1 w-full"
            onChange={event => setPrice(event.target.value)}
            required
            autoFocus
            error={errors.price}
            rightIcon={HiOutlineCurrencyEuro}
            step=".01"
            min="0.01"
          />
        </div>


        <div className="flex items-center justify-end mt-4">
          <Button className="ml-3" type="submit">{product ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </>

  )
}

export default ProductForm
