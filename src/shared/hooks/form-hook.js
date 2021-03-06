import { useCallback, useReducer } from "react";

import { validate } from "../util/validators";

const checkFormValidity = (state, action) => {
  let formIsValid = true;
  for (const inputId in state.inputs) {
    if (inputId === action.inputId) {
      formIsValid = formIsValid && action.isValid;
    } else {
      formIsValid = formIsValid && state.inputs[inputId].isValid;
    }
  }
  return formIsValid;
};

const formReducer = (state, action) => {
  let updatedArray;
  let arrayRef = "updatedArray";
  let inputCoord = [];
  switch (action.type) {
    case "INPUT_CHANGE":
      if (action.inputCoord) {
        updatedArray = JSON.parse(
          JSON.stringify(state.inputs[action.inputId].value)
        );
        action.inputCoord.forEach((coord, i) => {
          if (i !== action.inputCoord.length - 1) {
            arrayRef = arrayRef.concat("[", coord, "][1]");
          } else {
            arrayRef = arrayRef.concat("[", coord, "][0]");
          }
        });

        // eslint-disable-next-line
        eval(`${arrayRef} = action.value`);
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.inputId === "steps" ? updatedArray : action.value,
            isValid: action.isValid,
          },
        },
        isValid: checkFormValidity(state, action),
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    case "PUSH_ARR":
      updatedArray = JSON.parse(
        JSON.stringify(state.inputs[action.inputId].value)
      );

      inputCoord = [...action.inputCoord];

      inputCoord &&
        inputCoord.forEach((i) => {
          arrayRef = arrayRef.concat("[", i, "][1]");
        });

      // eslint-disable-next-line
      eval(`${arrayRef}.push(["", []])`);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: updatedArray,
            isValid: false,
          },
        },
        isValid: false,
      };

    case "POP_ARR":
      updatedArray = JSON.parse(
        JSON.stringify(state.inputs[action.inputId].value)
      );

      inputCoord = [...action.inputCoord];

      inputCoord.forEach((i) => {
        arrayRef = arrayRef.concat("[", i, "][1]");
      });

      // eslint-disable-next-line
      eval(`${arrayRef}.pop()`);

      const arrIsValid = validate(
        updatedArray,
        action.validators,
        "FLAT",
        null
      );

      const updatedForm = {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: updatedArray,
            isValid: arrIsValid,
          },
        },
      };
      action.isValid = arrIsValid;
      updatedForm.isValid = checkFormValidity(updatedForm, action);
      return updatedForm;
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormIsValid,
  });

  const inputHandler = useCallback((id, value, isValid, inputCoord) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
      inputCoord: inputCoord,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  const popArr = useCallback((id, validators, inputCoord) => {
    dispatch({
      type: "POP_ARR",
      inputId: id,
      validators: validators,
      inputCoord: inputCoord,
    });
  }, []);

  const pushArr = useCallback((id, inputCoord) => {
    dispatch({
      type: "PUSH_ARR",
      inputId: id,
      inputCoord: inputCoord,
    });
  }, []);

  return [formState, inputHandler, popArr, pushArr, setFormData];
};
