import { useDispatch } from "react-redux";
const Button = React.lazy(()=> import('../../ui/Button'))
import { deleteItem } from "./cartSlice";
import React from "react";
function DeleteItem({ id }) {
  const dispatch = useDispatch();

  return (

    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>

  );
}

export default DeleteItem;
