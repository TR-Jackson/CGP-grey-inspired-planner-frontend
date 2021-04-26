import React from "react";

import TextButton from "../TextButton/TextButton";

const AddRemoveButtons = (props) => (
  <div
    className={`flex ${
      props.stackY ? "flex-col py-5 h-10" : "px-5"
    } justify-center items-center w-5 py-0.5 m-1 shadow-md rounded-sm bg-gray-200 `}
  >
    <TextButton onClick={props.onClickAdd} tip={props.addTip}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 m-0 p-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </TextButton>
    <TextButton onClick={props.onClickRemove} tip={props.removeTip}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 12H4"
        />
      </svg>
    </TextButton>
  </div>
);

export default AddRemoveButtons;
