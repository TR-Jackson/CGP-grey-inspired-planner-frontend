import React, { useState } from "react";

import TextButton from "../../UI/TextButton/TextButton";
import ItemSteps from "../ItemSteps";

const ItemStep = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, subSteps] = props.step;
  return (
    <div>
      <p className="px-4">{step}</p>
      {subSteps.length !== 0 && (
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
      {subSteps.length !== 0 && isExpanded && <ItemSteps steps={subSteps} />}
    </div>
  );
};

export default ItemStep;
