import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } 
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE'){
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if(existingCartItem.amount === 1){
        updatedItems = state.items.filter(item => item.id !== action.id);
    }
    else{
        const updatedItem = {
            ...existingCartItem,
            amount : existingCartItem.amount - 1
        }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
        items : updatedItems,
        totalAmount : updatedTotalAmount
    }
  }

  if(action.type === 'CANCEL'){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, DispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    DispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    DispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cancelCartHandler = () => {
    DispatchCartAction({
      type : 'CANCEL'
    })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemToCart: addItemToCartHandler,
    removeItemFromCart: removeItemFromCartHandler,
    cancelCart : cancelCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
