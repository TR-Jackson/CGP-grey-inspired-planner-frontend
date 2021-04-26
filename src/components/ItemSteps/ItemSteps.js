import React from "react";

import ItemStep from "./ItemStep/ItemStep";

const ItemSteps = (props) => {
  return (
    <>
      {props.steps.map((step, i) => (
        <ItemStep key={i} step={step} level={props.level ? props.level : 1} />
      ))}
    </>
  );
};

export default ItemSteps;
