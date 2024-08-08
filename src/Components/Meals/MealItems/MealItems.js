import { useContext } from 'react';
import classes from './MealItems.module.css'
import MealItemsForm from './MealItemsForm';
import CartContext from '../../store/Cart-context';
const MealItems = props => {
    const price = `$${props.price.toFixed(2)}`;
    
    const cartCtx = useContext(CartContext);
    
    const addCartHandler = amount => {
       cartCtx.addItemToCart({
        id : props.id,
        name : props.name,
        amount : amount,
        price : props.price
       })
    };
    
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemsForm id={props.id} onAddCart={addCartHandler}/>
            </div>
        </li>
    );
};

export default MealItems;