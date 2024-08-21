import React from "react";
const Header = React.lazy(()=> import("../ui/Header"));


export default function Home() {
  return (
 
      <Header />
 
  );
}
