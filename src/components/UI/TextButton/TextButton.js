import React from "react";

import "./TextButton.css";

const TextButton = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`tooltip ${props.disabled ? " disabled" : " enabled"}`}
    >
      {props.children}
      <span className="tooltiptext">{props.tip}</span>
    </div>
  );
};

export default TextButton;
