import { useDispatch } from "react-redux";
const Button = React.lazy(()=> import('../../ui/Button'))
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import React from "react";
function UpdateItemQuantity({ id, currentQuantity }) {
  const dispatch = useDispatch();

  return (
 
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
 
  );
}

export default UpdateItemQuantity;
