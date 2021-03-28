import React from "react";

import "./ListItem.css";

const listItem = (props) => {
  return (
    <li className="list-item">
      <div className="next" onClick={props.onToggle}>
        &#10095;
      </div>
      <h1>{props.title}</h1>
      {props.expanded &&
        props.steps.map((step) => {
          return (
            <ul key={props.steps.indexOf(step)}>
              <li>
                #{props.steps.indexOf(step) + 1} {step}
              </li>
            </ul>
          );
        })}
      <p>
        Due: {props.day}/{props.month}/{props.year}
      </p>
    </li>
  );
};

export default listItem;
