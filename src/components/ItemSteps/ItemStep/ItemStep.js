import React from "react";

import ItemSteps from "../ItemSteps";
import "./ItemStep.css";

const ItemStep = (props) => {
  const [step, subSteps] = props.step;
  return (
    <>
      <li>{step}</li>
      <li>{subSteps && <ItemSteps steps={subSteps} />}</li>
    </>
  );
};

export default ItemStep;
