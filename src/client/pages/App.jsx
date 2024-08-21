import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";
const Cart = React.lazy(()=> import("../components/cart/Cart"));
const Error = React.lazy(()=> import("../ui/Error"));
const Home = React.lazy(()=> import("./Home"));
const SetPass = React.lazy(()=> import("./setGooglePass"));
const Product = React.lazy(()=> import("./product"));
const Login = React.lazy(()=> import("./Login"));
const SignUp = React.lazy(()=> import("./Signup"));
const CheckOut = React.lazy(()=> import("./CheckOut"));
export default function App({ data, nonce }) {
  return (
 
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login nonce={nonce} />} />
      <Route path="/signup" element={<SignUp nonce={nonce} />} />
      <Route path="/signup/set-password" element={<SetPass />} />
      <Route path="/products" element={<Product data={data} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
    </Routes>
 
  );
}
