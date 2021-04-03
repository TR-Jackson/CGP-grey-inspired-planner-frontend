import React, { useState } from "react";

import TextButton from "../../UI/TextButton/TextButton";
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
          <TextButton
            tip={isExpanded ? "Show Less" : "Show More"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {" "}
            <div
              className={`expand-arrow ${
                isExpanded ? "toggle-down" : "toggle-up"
              }`}
            ></div>
          </TextButton>
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
