import React from 'react';
import { Card } from "flowbite-react";

const ProductCard = ({product}) => {
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
      <div className="flex items-center justify-between">
        <span className="text-3xl pr-4 font-bold text-gray-900 dark:text-white">{product.price} €</span>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card>
  );
};

export default ProductCard;
