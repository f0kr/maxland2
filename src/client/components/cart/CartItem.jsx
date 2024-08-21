import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
const DeleteItem = React.lazy(()=> import("./DeleteItem"))
const UpdateItemQuantity = React.lazy(()=> import("./UpdateItemQuantity"));
import { getCurrentQuantityById } from "./cartSlice";
import React from "react";
function CartItem({ item }) {
  const { id, name, quantity, totalPrice, imageUrl } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  return (

    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <img src={imageUrl} alt={id} />
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        <DeleteItem id={id} />
      </div>
    </li>

  );
}

export default CartItem;
