import React, { useCallback, useEffect, useState } from "react";
import axios from "../../axios-planner";

import NestedInputs from "../../components/FormElements/Input/NestedInputs/NestedInputs";
import Input from "../../components/FormElements/Input/Input";
import Button from "../../components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import TextButton from "../../components/UI/TextButton/TextButton";
import "./UpdateItem.css";

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
      value: [["", null]],
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

  const { itemData, modalIsOpen } = props;

  useEffect(() => {
    if (itemData) {
      const formData = {};
      Object.entries(itemData).forEach(([key, value]) => {
        if (key !== "_id") {
          formData[key] = {};
          formData[key].value = value;
          formData[key].isValid = true;
        }
      });
      setFormData(formData, true);
      const newCount = new Array(itemData.steps.length)
        .fill(undefined)
        .map((value, index) => {
          return index;
        });
      setStepsCount(newCount);
    }
  }, [itemData, setFormData]);

  useEffect(() => {
    if (!modalIsOpen) {
      setClearInputs(true);
    }
  }, [modalIsOpen]);

  const itemSubmitHandler = (event) => {
    event.preventDefault();
    const form = {};
    Object.entries(formState.inputs).map(([key, value]) => {
      return (form[key] = value.value);
    });
    if (itemData) {
      form._id = itemData._id;
    }
    console.log(form);
    axios
      .post(`/${itemData ? "update-item" : "add-item"}`, form)
      .then((result) => {
        if (!itemData) {
          form._id = result.data._id;
          props.onPostHandler("NEW", form);
        } else {
          props.onPostHandler("UPDATE", form);
        }
        setFormData(
          {
            title: {
              value: "",
              isValid: false,
            },
            steps: {
              value: [["", null]],
              isValid: false,
            },
            due: {
              value: "",
              isValid: false,
            },
          },
          false
        );
        props.closeModal();
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
        initialValue={itemData && itemData.title}
        initialValid={itemData && true}
      />
      <p>
        <strong>Steps:</strong>
      </p>
      {/* {stepsCount.map((i) => {
        i = stepsCount.indexOf(i);
        return (
          <>
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
              initialValue={itemData && itemData.steps[i]}
              initialValid={itemData && true}
            />
          </>
        );
      })} */}
      {console.log(formState)}
      <NestedInputs
        formState={formState.inputs.steps.value}
        id="steps"
        element="textarea"
        type="text"
        onInput={inputHandler}
        errorText={"Enter a valid step (min. 5 characters)"}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
      />
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
        initialValue={
          itemData &&
          new Date(itemData.due[0], itemData.due[1], itemData.due[2]).getTime()
        }
        initialValid={itemData && true}
      />
      <Button
        onClick={itemSubmitHandler}
        type="submit"
        disabled={!formState.isValid}
        modalClosed={props.modalClosed}
      >
        {`${itemData ? "UPDATE" : "ADD"} ITEM`}
      </Button>
    </form>
  );
};

export default NewItem;
