import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/Cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItemToCart({
      ...item,
      amount: 1,
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItemFromCart(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onClickHandler = () => {
    setButtonIsClicked(true);
  };
  const onCancelHandler = () => {
    setButtonIsClicked(false);
  };

  const orderHandler = async (order) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-b5b2d-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify(order),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setIsOrder(true);
    cartCtx.cancelCart();
  };

  const cartModelContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {buttonIsClicked && (
        <CheckOut onCancel={onCancelHandler} onOrder={orderHandler} />
      )}
      {!buttonIsClicked && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={onClickHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const placedOrder = (
    <React.Fragment>
      <p>Order is Placed. We will deliver is soon. Thank You!!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !isOrder && cartModelContent}
      {isSubmitting && !isOrder && <p>Placing your Order...</p>}
      {isOrder && !isSubmitting && placedOrder}
    </Modal>
  );
};

export default Cart;
