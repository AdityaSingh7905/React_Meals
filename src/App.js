import React, { useState } from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Components/store/CartContextProvider";
function App() {
  
  const [cartIsShown, setCartIsShown] = useState(false);
  
  const showCartHandler = () => {
    setCartIsShown(true);
  } 

  const hideCartHandler = () => {
    setCartIsShown(false);
  }
  return (
    <CartContextProvider>
      {cartIsShown && <Cart  onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
