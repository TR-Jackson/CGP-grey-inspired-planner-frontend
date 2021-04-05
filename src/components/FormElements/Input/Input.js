import React, { useReducer, useEffect } from "react";
import DatePicker from "react-datepicker";

import { validate } from "../../../shared/util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid:
          action.initValid !== undefined
            ? action.initValid
            : validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "CLEAR":
      return {
        value: "",
        isTouched: false,
        isValid: false,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const {
    id,
    onInput,
    inputCoord,
    clear,
    onClear,
    initialValid,
    initialValue,
    currValue,
  } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    if (currValue !== value) {
      onInput(id, value, isValid, inputCoord);
    }
  }, [id, value, isValid, onInput, inputCoord, currValue]);

  useEffect(() => {
    if (clear) {
      dispatch({
        type: "CLEAR",
      });
      onClear();
    }
  }, [clear, onClear]);

  useEffect(() => {
    if (initialValue) {
      dispatch({
        type: "CHANGE",
        val: initialValue,
        initValid: initialValid,
      });
    }
  }, [initialValue, initialValid]);

  const changeHandler = (event) => {
    if (props.currValue !== event.target.value) {
      dispatch({
        type: "CHANGE",
        val: event.target.value,
        validators: props.validators,
      });
    }
  };

  const dateChangedHandler = (newDate) => {
    dispatch({
      type: "CHANGE",
      val: newDate.getTime().toString(),
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" && props.type !== "date" ? (
      <input
        coord={props.coord}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : props.element === "date" ? (
      <DatePicker
        onChange={dateChangedHandler}
        selected={inputState.value && new Date(parseInt(inputState.value))}
        popperPlacement="top-start"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control 
                ${
                  !inputState.isValid &&
                  inputState.isTouched &&
                  "form-control--invalid"
                }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;