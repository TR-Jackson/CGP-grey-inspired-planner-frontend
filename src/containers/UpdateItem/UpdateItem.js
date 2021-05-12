import React, { useCallback, useEffect, useState } from "react";
import axios from "../../axios-planner";

import AddRemoveButtons from "../../components/UI/AddRemoveButtons/AddRemoveButtons";
import NestedInputs from "../../components/FormElements/Input/NestedInputs/NestedInputs";
import Input from "../../components/FormElements/Input/Input";
import Button from "../../components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewItem = (props) => {
  const [clearInputs, setClearInputs] = useState(false);
  const [stepValidators] = useState([
    VALIDATOR_REQUIRE(),
    VALIDATOR_MINLENGTH(5),
  ]);
  const [
    formState,
    inputHandler,
    popArrItem,
    pushArrItem,
    setFormData,
  ] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      steps: {
        value: [["", []]],
        isValid: false,
      },

      due: {
        value: "",
        isValid: false,
      },
    },
    false
  );

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
              value: [["", []]],
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
    setFormData(
      {
        title: {
          value: "",
          isValid: false,
        },
        steps: {
          value: [["", []]],
          isValid: false,
        },

        due: {
          value: "",
          isValid: false,
        },
      },
      false
    );
  }, [setFormData]);

  const editInputs = (action, validators, coord) => {
    switch (action) {
      case "PUSH":
        pushArrItem("steps", coord);
        break;
      case "POP":
        popArrItem("steps", validators, coord);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("formState: ", formState);
  }, [formState]);

  return (
    <form
      className="flex flex-col jusitfy-center space-y-5 p-5"
      onSubmit={itemSubmitHandler}
    >
      <div className="flex-shrink">
        <p className="font-semibold mb-1">Title:</p>
        <Input
          onClear={onClear}
          id="title"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          clear={clearInputs}
          initialValue={itemData && itemData.title}
          initialValid={itemData ? true : false}
        />
      </div>
      <div>
        <div className="flex items-center mb-1">
          <p className="font-semibold mr-4">Steps:</p>
          <AddRemoveButtons
            onClickAdd={() => editInputs("PUSH", null, [])}
            addTip={"Add a step"}
            onClickRemove={() =>
              formState.inputs.steps.value.length !== 0 &&
              editInputs("POP", stepValidators, [])
            }
            removeTip={"Remove a step"}
          />
        </div>
        <div>
          <NestedInputs
            clear={clearInputs}
            onClear={onClear}
            formState={formState.inputs.steps.value}
            id="steps"
            element="textarea"
            type="text"
            onInput={inputHandler}
            errorText={"Enter a valid step (min. 5 characters)"}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            editInput={editInputs}
            useInitValue={!!itemData}
          />
        </div>
      </div>
      <div>
        <p className="font-semibold mb-1">Complete by:</p>
        <Input
          onClear={onClear}
          id="due"
          element="date"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          clear={clearInputs}
          initialValue={
            itemData &&
            new Date(
              itemData.due[0],
              itemData.due[1],
              itemData.due[2]
            ).getTime()
          }
          initialValid={itemData ? true : false}
        />
      </div>
      <div className="flex pt-2 justify-start">
        <Button
          width="30"
          onClick={itemSubmitHandler}
          type="submit"
          disabled={!formState.isValid}
          modalClosed={props.modalClosed}
        >
          {`${itemData ? "UPDATE" : "ADD"} ITEM`}
        </Button>
      </div>
    </form>
  );
};

export default NewItem;
