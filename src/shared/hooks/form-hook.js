import { useCallback, useReducer } from "react";

import { dateToArray } from "../util/helper-functions";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      console.log("action: ", action);
      const updatedSteps = [...state.inputs[action.inputId].value];
      if (action.stepId !== undefined) {
        console.log("updating steps");
        //should just use an object here but idrc
        updatedSteps[action.stepId] = action.value;
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value:
              action.inputId === "due"
                ? dateToArray(action.value)
                : action.inputId === "steps"
                ? updatedSteps
                : action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormIsValid,
  });

  const inputHandler = useCallback((id, value, isValid, stepId) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
      stepId: stepId,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
