import React, { useState } from "react";

import ItemSteps from "../ItemSteps";
import "./ItemStep.css";

const ItemStep = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, subSteps] = props.step;
  return (
    <div className="item-step">
      <div className="main">
        <li>{step}</li>
        {subSteps && (
          <div onClick={() => setIsExpanded(!isExpanded)}>
            <strong>{isExpanded ? "-" : "+"}</strong>
          </div>
        )}
      </div>
      {subSteps && isExpanded && (
        <li>
          <ItemSteps steps={subSteps} />
        </li>
      )}
    </div>
  );
};

export default ItemStep;
