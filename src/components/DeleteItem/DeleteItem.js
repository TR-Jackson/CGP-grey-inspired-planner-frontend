import React from "react";

import Button from "../FormElements/Button/Button";
import "./DeleteItem.css";

const DeleteItem = (props) => {
  return (
    <div className="delete-item">
      <p>Are you sure you want to delete this item?</p>
      <Button danger onClick={props.onClick}>
        Delete Item
      </Button>
    </div>
  );
};

export default DeleteItem;
