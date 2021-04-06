import React from "react";

import NestedInput from "./NestedInput/NestedInput";
import "./NestedInputs.css";

const NestedInputs = (props) => {
  return (
    <div>
      <ul>
        {props.formState.map((input, i) => (
          <li key={i}>
            <NestedInput
              inputCoord={props.inputCoord ? props.inputCoord.push(i) : [i]}
              formState={input}
              id={props.id}
              type={props.type}
              placeholder={props.placeholder}
              onInput={props.onInput}
              clear={props.clear}
              errorText={props.errorText}
              validators={props.validators}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NestedInputs;
