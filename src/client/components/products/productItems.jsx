import { useDispatch, useSelector } from "react-redux";
const Button = React.lazy(()=> import('../../ui/Button'))
const UpdateItemQuantity = React.lazy(()=> import("../cart/UpdateItemQuantity"));
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import React from "react";

function ProductItem({ item }) {
  const dispatch = useDispatch();
  const { _id: id, name, price, soldOut, image } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      id,
      name,
      quantity: 1,
      price,
      totalPrice: price * 1,
      image,
      soldOut,
    };
    dispatch(addItem(newItem));
  }

  return (
 
    <li className="flex gap-4 py-2">
      <img
        src={image}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(price)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
 
  );
}

export default ProductItem;
