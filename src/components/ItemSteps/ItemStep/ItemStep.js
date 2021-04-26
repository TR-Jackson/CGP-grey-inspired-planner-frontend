import React, { useState } from "react";

import ToggleArrow from "../../UI/ToggleArrow/ToggleArrow";
import ItemSteps from "../ItemSteps";

const ItemStep = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, subSteps] = props.step;
  return (
    <>
      <div className="flex">
        <p className={`pl-${props.level * 4} h-auto text-white`}>{step}</p>
        {subSteps.length !== 0 && (
          <div className={"flex-grow h-1"}>
            <ToggleArrow
              mt={1.5}
              height={4}
              floatLeft
              expanded={isExpanded}
              onToggle={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          </div>
        )}
      </div>
      {subSteps.length !== 0 && isExpanded && (
        <ItemSteps steps={subSteps} level={props.level + 1} />
      )}
    </>
  );
};

export default ItemStep;
