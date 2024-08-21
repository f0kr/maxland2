
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { Link } from "react-router-dom";
const Button = React.lazy(()=> import('../../ui/Button'))
const CartItem = React.lazy(()=> import('./CartItem'))
const EmptyCart = React.lazy(()=> import('./EmptyCart'))

function Cart() {
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (

    <div className="px-4 py-3">
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Link to={"/checkout"}>check out</Link>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>

  );
}

export default Cart
