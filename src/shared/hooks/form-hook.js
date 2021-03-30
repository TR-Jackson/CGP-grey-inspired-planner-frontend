import { useCallback, useReducer } from "react";

import { validate } from "../util/validators";
import { dateToArray } from "../util/helper-functions";

const checkFormValidity = (state, action) => {
  let formIsValid = true;
  for (const inputId in state.inputs) {
    if (inputId === action.inputId) {
      formIsValid = formIsValid && action.isValid;
    } else {
      formIsValid = formIsValid && state.inputs[inputId].isValid;
    }
  }
  // console.log("form is valid: ", formIsValid);
  return formIsValid;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const updatedSteps = state.inputs[action.inputId].value;
      if (action.stepId !== undefined) {
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
        isValid: checkFormValidity(state, action),
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    case "DELETE_ARR_ITEM":
      const updatedArr = state.inputs[action.inputId].value;
      updatedArr.splice(-1, 1);
      const arrIsValid = validate(updatedArr, action.validators);
      console.log("updatedArr: ", updatedArr);
      const updatedForm = {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: updatedArr,
            isValid: arrIsValid,
          },
        },
      };
      console.log("updatedForm: ", updatedForm);
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

  const removeArrItem = useCallback((id, validators, currCount) => {
    dispatch({
      type: "DELETE_ARR_ITEM",
      inputId: id,
      validators: validators,
      currCount: currCount,
    });
  }, []);

  return [formState, inputHandler, removeArrItem, setFormData];
};
