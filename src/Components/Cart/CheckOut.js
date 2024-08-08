import useInput from "../hooks/use-input";
import classes from "./CheckOut.module.css";

const CheckOut = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueError: nameError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput();

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    valueError: streetError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetResetHandler,
  } = useInput();

  const {
    enteredValue: enteredPostal,
    valueIsValid: postalIsValid,
    valueError: postalError,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
    reset: postalResetHandler,
  } = useInput();

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    valueError: cityError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityResetHandler,
  } = useInput();

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    nameResetHandler();
    streetResetHandler();
    postalResetHandler();
    cityResetHandler();
  };

  const onConfirmHandler = () => {
     const order = {
      name : enteredName,
      street : enteredStreet,
      postalCode : enteredPostal,
      city : enteredCity
     }
     props.onOrder(order);
  };

  const nameClasses = `${classes.control} ${ nameError ? classes.invalid : ''}`;
  const streetClasses = `${classes.control} ${ streetError ? classes.invalid : ''}`;
  const postalClasses = `${classes.control} ${ postalError ? classes.invalid : ''}`;
  const cityClasses = `${classes.control} ${ cityError ? classes.invalid : ''}`;
  

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameError && <p className={classes.error}>Please enter a valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetError && <p className={classes.error}>Please enter a valid Street.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalError && <p className={classes.error}>Please enter a valid Postal Code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityError && <p className={classes.error}>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={ props.onCancel }>Cancel</button>
        <button className={classes.submit} disabled={!formIsValid} onClick={onConfirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
