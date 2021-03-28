import React, { useEffect, useState } from "react";
import axios from "../../axios-planner";

import Input from "../../components/FormElements/Input";
import Button from "../../components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewItem.css";

const NewItem = (props) => {
  const [stepsCount, setStepsCount] = useState([0]);
  const [formState, inputHandler] = useForm({
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

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const itemSubmitHandler = (event) => {
    event.preventDefault();
    console.log("formState: ", formState);
    const form = {};
    Object.entries(formState.inputs).map(([key, value]) => {
      return (form[key] = value.value);
    });
    axios
      .post("/add-item", form)
      .then((result) => {
        console.log("posted");
        props.modalClosed();
      })
      .catch((err) => {
        console.log(err);
      });
    props.postHandler(form);
  };

  return (
    <form className="place-form" onSubmit={itemSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <p>Steps:</p>
      {stepsCount.map((i) => {
        i = stepsCount.indexOf(i);
        return (
          <Input
            key={i}
            id={`steps`}
            stepId={i}
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid step (at least 5 characters)."
            onInput={inputHandler}
          />
        );
      })}
      <p
        onClick={() =>
          setStepsCount([...stepsCount, stepsCount[stepsCount.length - 1] + 1])
        }
      >
        +
      </p>
      <Input
        id="due"
        element="date"
        label="Complete by:"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
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
