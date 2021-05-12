import React from "react";

import NestedInput from "./NestedInput/NestedInput";

const NestedInputs = (props) => {
  return (
    <>
      {props.formState.map((input, i) => {
        return (
          <NestedInput
            key={i}
            inputCoord={props.inputCoord ? [...props.inputCoord, i] : [i]}
            formState={input}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onInput={props.onInput}
            clear={props.clear}
            onClear={props.onClear}
            errorText={props.errorText}
            validators={props.validators}
            editInput={props.editInput}
            useInitValue={props.useInitValue}
          />
        );
      })}
    </>
  );
};

export default NestedInputs;
