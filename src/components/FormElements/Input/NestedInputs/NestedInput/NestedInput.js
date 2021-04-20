import React from "react";

import TextButton from "../../../../UI/TextButton/TextButton";
import Input from "../../Input";
import NestedInputs from "../NestedInputs";
import "./NestedInput.css";

const NestedInput = (props) => {
  const [input, formState] = props.formState;
  return (
    <ul>
      <li>
        <Input
          inputCoord={props.inputCoord}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          // initalValue={input}
          // initalValid={!!input}
          currValue={input}
          onInput={props.onInput}
          clear={props.clear}
          errorText={props.errorText}
          validators={props.validators}
        />
        <TextButton
          tip="Add a substep"
          onClick={() => props.editInput("PUSH", null, props.inputCoord)}
        >
          <strong>+</strong>
        </TextButton>
        <TextButton
          tip="Remove a substep"
          disabled={formState.length === 0}
          onClick={
            formState.length !== 0
              ? () => props.editInput("POP", props.validators, props.inputCoord)
              : () => {}
          }
        >
          <strong>-</strong>
        </TextButton>
      </li>
      {!!formState && (
        <NestedInputs
          formState={formState}
          inputCoord={props.inputCoord}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onInput={props.onInput}
          clear={props.clear}
          errorText={props.errorText}
          validators={props.validators}
          editInput={props.editInput}
        />
      )}
    </ul>
  );
};

export default NestedInput;
