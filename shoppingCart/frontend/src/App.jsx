import { useEffect, useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Products from "./components/product";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <Products 
         cartItems={cartItems}
      setCartItems={setCartItems}
      />
      <Cart 
         cartItems={cartItems}
         setCartItems={setCartItems}
      />
    </>
  );
}

export default App;
