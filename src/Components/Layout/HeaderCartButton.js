import { useContext, useEffect, useState } from "react";
import HeaderCartIcon from "../Cart/HeaderCartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../store/Cart-context";
const HeaderCartButton = props => {
    
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

   const btnClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump : ''}`;

   useEffect(() => {
    // if(cartCtx.items.length === 0){
    //     return;
    // } 
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
    }, 300)

    return () => {
        clearTimeout(timer);
    }
        
   }, [cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <HeaderCartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
}

export default HeaderCartButton;