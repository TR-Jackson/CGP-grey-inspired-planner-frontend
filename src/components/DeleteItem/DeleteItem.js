import React from "react";

import Button from "../FormElements/Button/Button";

const DeleteItem = (props) => {
  return (
    <div className="flex flex-col text-center">
      <p className="mb-6 mt-2">Are you sure you want to delete this item?</p>
      <Button danger onClick={props.onClick}>
        DELETE ITEM
      </Button>
    </div>
  );
};

export default DeleteItem;
