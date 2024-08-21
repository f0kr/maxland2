import { Link } from "react-router-dom";
import React from "react";
const SearchBar = React.lazy(()=> import("../components/Search,"));
const CartOverview = React.lazy(()=> import("../components/cart/CartOverview"));

function Header() {
  return (
 
    <header>
      <Link to="/">Website</Link>
      <SearchBar />
      <CartOverview />
      <Link to="/signup">Sign up</Link>
    </header>
 
  );
}

export default Header;
