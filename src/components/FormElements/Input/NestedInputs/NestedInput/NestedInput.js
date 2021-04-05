import React from "react";

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
        />
      </li>
      {formState && (
        <NestedInputs
          formState={formState}
          coord={props.inputCoord}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onInput={props.onInput}
          clear={props.clear}
          errorText={props.errorText}
        />
      )}
    </ul>
  );
};

export default NestedInput;
