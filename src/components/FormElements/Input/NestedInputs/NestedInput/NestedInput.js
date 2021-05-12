import React from "react";

import AddRemoveButtons from "../../../../UI/AddRemoveButtons/AddRemoveButtons";
import Input from "../../Input";
import NestedInputs from "../NestedInputs";

const NestedInput = (props) => {
  const [input, formState] = props.formState;
  return (
    <>
      <div className="flex items-center justify-start flex-shrink">
        <div className={`ml-${(props.inputCoord.length - 1) * 6} w-auto`}>
          <Input
            element="input"
            inputCoord={props.inputCoord}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            initialValue={props.useInitValue ? input : null}
            initialValid={props.useInitValue ? true : false}
            currValue={input}
            onInput={props.onInput}
            clear={props.clear}
            onClear={props.onClear}
            errorText={props.errorText}
            validators={props.validators}
          />
        </div>
        <div className="mx-2">
          <AddRemoveButtons
            addTip="Add a substep"
            onClickAdd={() => props.editInput("PUSH", null, props.inputCoord)}
            removeTip="Remove a substep"
            onClickRemove={
              formState.length !== 0
                ? () =>
                    props.editInput("POP", props.validators, props.inputCoord)
                : () => {}
            }
          />
        </div>
      </div>
      <div>
        {formState.length !== 0 && (
          <NestedInputs
            useInitValue={props.useInitValue}
            formState={formState}
            inputCoord={props.inputCoord}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onInput={props.onInput}
            clear={props.clear}
            onClear={props.onClear}
            errorText={props.errorText}
            validators={props.validators}
            editInput={props.editInput}
          />
        )}
      </div>
    </>
  );
};

export default NestedInput;
