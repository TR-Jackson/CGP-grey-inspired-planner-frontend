import React from "react";

import ItemStep from "./ItemStep/ItemStep";
import "./ItemSteps.css";

const ItemSteps = (props) => {
  console.log("itemsteps: ", props.step);
  return (
    <div className="steps">
      <ul>
        {props.steps.map((step) => (
          <li>
            <ItemStep step={step} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemSteps;
