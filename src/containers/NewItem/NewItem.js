import React, { useCallback, useState } from "react";
import axios from "../../axios-planner";

import Input from "../../components/FormElements/Input";
import Button from "../../components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import TextButton from "../../components/UI/TextButton/TextButton";
import "./NewItem.css";

const NewItem = (props) => {
  const [clearInputs, setClearInputs] = useState(false);
  const [stepValidators] = useState([
    VALIDATOR_REQUIRE(),
    VALIDATOR_MINLENGTH(5),
  ]);
  const [stepsCount, setStepsCount] = useState([0]);
  const [formState, inputHandler, removeArrItem, setFormData] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    steps: {
      value: [],
      isValid: false,
    },

    due: {
      value: "",
      isValid: false,
    },
  });

  const itemSubmitHandler = (event) => {
    event.preventDefault();
    const form = {};
    Object.entries(formState.inputs).map(([key, value]) => {
      return (form[key] = value.value);
    });
    axios
      .post("/add-item", form)
      .then((result) => {
        form._id = result.data._id;
        console.log(form);
        props.closeModal();
        props.onPostHandler(form);
        setFormData(
          {
            title: {
              value: "",
              isValid: false,
            },
            steps: {
              value: [""],
              isValid: false,
            },
            due: {
              value: "",
              isValid: false,
            },
          },
          false
        );
        setClearInputs(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClear = useCallback(() => {
    setClearInputs(false);
  }, []);

  const toggleStepCountHandler = (action, validators) => {
    switch (action) {
      case "ADD":
        const newCount = new Array(stepsCount.length + 1)
          .fill(undefined)
          .map((value, index) => {
            return index;
          });
        setStepsCount(newCount);
        break;
      case "REMOVE":
        if (stepsCount.length > 1) {
          removeArrItem("steps", validators, stepsCount);
          const newCount = new Array(stepsCount.length - 1)
            .fill(undefined)
            .map((value, index) => {
              return index;
            });
          setStepsCount(newCount);
        }
        break;
      default:
        break;
    }
  };

  return (
    <form className="place-form" onSubmit={itemSubmitHandler}>
      <Input
        onClear={onClear}
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        clear={clearInputs}
      />
      <p>
        <strong>Steps:</strong>
      </p>
      {stepsCount.map((i) => {
        i = stepsCount.indexOf(i);
        return (
          <Input
            onClear={onClear}
            key={i}
            id={`steps`}
            stepId={i}
            element="textarea"
            validators={stepValidators}
            errorText="Please enter a valid step (at least 5 characters)."
            onInput={inputHandler}
            clear={clearInputs}
          />
        );
      })}
      <div className="add-remove-buttons">
        <TextButton
          disabled={false}
          onClick={() => toggleStepCountHandler("ADD")}
          tip="Add a step"
        >
          <strong>+</strong>
        </TextButton>
        <TextButton
          disabled={stepsCount.length > 1 ? false : true}
          onClick={() => toggleStepCountHandler("REMOVE", stepValidators)}
          tip="Remove a step"
        >
          <strong>-</strong>
        </TextButton>
      </div>
      <Input
        onClear={onClear}
        id="due"
        element="date"
        label="Complete by:"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        clear={clearInputs}
      />
      <Button
        onClick={itemSubmitHandler}
        type="submit"
        disabled={!formState.isValid}
        modalClosed={props.modalClosed}
      >
        ADD ITEM
      </Button>
    </form>
  );
};

export default NewItem;
