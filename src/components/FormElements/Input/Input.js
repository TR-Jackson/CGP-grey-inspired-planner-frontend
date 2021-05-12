import React, { useReducer, useEffect, useState } from "react";
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
    case "RESET":
      return init(action.resetPayload);
    default:
      return state;
  }
};

const init = (initPayload) => {
  return {
    value: initPayload.value || "",
    isTouched: false,
    isValid: initPayload.isValid || false,
  };
};

const Input = (props) => {
  const [hasInit, setHasInit] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputReducer,
    {
      value: props.initialValue || "",
      isTouched: false,
      isValid: props.initialValid || false,
    },
    init
  );

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
  }, [id, value, isValid, onInput, inputCoord, currValue, initialValue]);

  useEffect(() => {
    if (clear) {
      dispatch({
        type: "RESET",
        resetPayload: {
          value: "",
          isTouched: false,
          isValid: false,
        },
      });
      onClear();
      setHasInit(false);
    }
  }, [clear, onClear]);

  useEffect(() => {
    if (!!initialValue && !hasInit) {
      dispatch({
        type: "RESET",
        resetPayload: {
          value: initialValue,
          isTouched: false,
          isValid: initialValid,
        },
      });
      setHasInit(true);
    }
  }, [initialValue, initialValid, hasInit, setHasInit]);

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
      val: newDate.getTime(),
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
        className="w-auto rounded-md shadow-sm"
        size={20}
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
        className="rounded-md"
        onChange={(date) => dateChangedHandler(date)}
        selected={inputState.value && new Date(parseInt(inputState.value))}
        popperPlacement="top-start"
        dateFormat="dd/MM/yyyy"
      />
    ) : (
      <textarea
        className="w-max resize-none shadow-sm"
        id={props.id}
        rows={props.rows || 2}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`w-max
                ${
                  !inputState.isValid &&
                  inputState.isTouched &&
                  "form-control--invalid"
                }`}
    >
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
