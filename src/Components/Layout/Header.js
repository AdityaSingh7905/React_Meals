import React,{Fragment} from "react";

import classes from './Header.module.css'
import MealsImage from '../assets/Meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

let Header = props => {
   return (
    <Fragment>
      <header className={classes.header}>
         <h1>ReactMeals</h1>
         <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes.image}>
         <img src={MealsImage} alt="A Delicious food on the table"/>
       </div>
   </Fragment>
   );
}

export default Header;