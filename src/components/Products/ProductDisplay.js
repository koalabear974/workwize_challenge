import React from 'react';
import { fetchAllProducts } from "@/services/ProductService";
import Loading from "@/components/Navigation/Loading";
import ProductCard from "@/services/ProductCard";

const ProductDisplay = () => {
  const {products, loading, error} = fetchAllProducts();

  if (loading) return (<Loading fullscreen={false}/>)
  if (error) return (<div>{error}</div>)
  if (products.length === 0) return (<div className="w-full flex-1 text-xl font-bold flex justify-center items-center">No products</div>)

  return (
    <div className="container mx-auto h-full flex-1 p-4 flex flex-wrap gap-4 justify-center">
      {products?.map((product) => (<ProductCard key={product.id} product={product} />))}
    </div>
  );
};

export default ProductDisplay;
