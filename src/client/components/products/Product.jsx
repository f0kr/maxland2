import { Link } from "react-router-dom";
const ProductItem = React.lazy(()=> import("./productItems"));
import React from "react";

function Products({ data, isSSR }) {
  if (!data) data = [{ _id: 123123, name: "ffff", price: 123, soldOut: false }];
  return (
 
    <>
      <ul className="divide-y divide-stone-200 px-2">
        {data.map((product) => {
          return <ProductItem item={product} key={product._id} />;
        })}
      </ul>
      <Link to={"/cart"}>cart</Link>
    </>
 
  );
}

export default Products;
