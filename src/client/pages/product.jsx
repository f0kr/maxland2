 
const Products = React.lazy(()=> import("../components/products/Product"));
import React from "react";
export default function Product({ data }) {
  return (
 
      <Products data={data} />
 
  )
}
