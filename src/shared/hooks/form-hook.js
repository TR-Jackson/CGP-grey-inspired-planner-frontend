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
  return formIsValid;
};

const formReducer = (state, action) => {
  let updatedArray;
  switch (action.type) {
    case "INPUT_CHANGE":
      // const updatedSteps = [...state.inputs[action.inputId].value];
      // if (action.stepId !== undefined) {
      //   updatedSteps[action.stepId] = action.value;
      // }
      if (action.inputCoord) {
        updatedArray = JSON.parse(
          JSON.stringify(state.inputs[action.inputId].value)
        );
        console.log("updatedArray: ", updatedArray);
        let arrayRef = "updatedArray";
        action.inputCoord.forEach((i) => {
          arrayRef = arrayRef.concat("[", i, "][0]");
        });

        // eslint-disable-next-line
        eval(arrayRef.concat(" = action.value"));
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
                ? updatedArray
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
    case "ADD_ARR_ITEM":
      updatedArray = JSON.parse(
        JSON.stringify(state.inputs[action.inputId].value)
      );
      // let arrayRef = "updatedArray";

      // action.inputCoord &&
      //   action.inputCoord.forEach((i) => {
      //     arrayRef = arrayRef.concat("[", i, "]");
      //   });

      // // eslint-disable-next-line
      // eval(arrayRef.concat('.push(["", null])'));
      updatedArray.push(["", null]);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: updatedArray,
            isValid: false,
          },
        },
      };

    case "DELETE_ARR_ITEM":
      updatedArray = state.inputs[action.inputId].value;
      updatedArray.splice(-1, 1);
      const arrIsValid = validate(updatedArray, action.validators);
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

  const removeArrItem = useCallback((id, validators, currCount) => {
    dispatch({
      type: "DELETE_ARR_ITEM",
      inputId: id,
      validators: validators,
      currCount: currCount,
    });
  }, []);

  const addArrItem = useCallback((id, inputCoord) => {
    dispatch({
      type: "ADD_ARR_ITEM",
      inputId: id,
      inputCoord: inputCoord,
    });
  }, []);

  return [formState, inputHandler, removeArrItem, addArrItem, setFormData];
};
