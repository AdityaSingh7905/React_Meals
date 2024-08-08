import { useState } from "react";

const useInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = enteredValue.trim().length !== 0;
  const valueError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    enteredValue,
    valueIsValid,
    valueError,
    valueChangeHandler,
    valueBlurHandler,
    reset
  };
};

export default useInput;
