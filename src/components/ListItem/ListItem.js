import React from "react";

import DeleteIcon from "../../assets/delete-icon.png";
import EditIcon from "../../assets/edit-icon.png";
import TextButton from "../UI/TextButton/TextButton";
import "./ListItem.css";

const listItem = (props) => {
  return (
    <li className="list-item">
      <div className="side-box">
        <TextButton disabled={false} onClick={props.onDelete} tip="Delete Item">
          <img className="icon" src={DeleteIcon} alt="D" />
        </TextButton>
        <TextButton disabled={false} onClick={props.onEdit} tip="Edit Item">
          <img className="icon" src={EditIcon} alt="E" />
        </TextButton>
      </div>
      <div className="list-item-content">
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
      </div>
      <div
        className={`arrow-right ${
          props.expanded ? "toggle-down" : "toggle-up"
        }`}
        onClick={props.onToggle}
      ></div>
    </li>
  );
};

export default listItem;
