import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotalCartQuantity } from "./cartSlice";
import { LiaShoppingBagSolid } from "react-icons/lia";
import React from "react";
function CartOverview() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/cart");
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  if (!totalCartQuantity) return null;

  return (
    <div className="cart-icon" onClick={handleOnClick}>
      <LiaShoppingBagSolid />{" "}
      <span className="cart-count">{totalCartQuantity}</span>
    </div>
  );
}

export default CartOverview;
