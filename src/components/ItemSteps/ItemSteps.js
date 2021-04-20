import React from "react";

import ItemStep from "./ItemStep/ItemStep";

const ItemSteps = (props) => {
  return (
    <>
      {props.steps.map((step) => (
        <ItemStep step={step} level={props.level ? props.level : 1} />
      ))}
    </>
  );
};

export default ItemSteps;
