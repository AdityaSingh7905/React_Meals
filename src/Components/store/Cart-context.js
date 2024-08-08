import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount : 0,
    addItemToCart : () => {},
    removeItemFromCart : () => {},
    cancelCart : () => {}
});

export default CartContext;