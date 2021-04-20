import React from "react";

import TextButton from "../TextButton/TextButton";

const ToggleArrow = (props) => {
  return (
    <TextButton
      styling={`text-right ml-0 mr-0  mt-${props.mt} h-${props.height} float-${
        props.floatLeft ? "left" : "right"
      }`}
      tip={props.expanded ? "Show less" : "Show more"}
    >
      <svg
        className={`m-0 w-auto h-${
          props.height
        } hover:fill-current hover:text-gray-100 transiton delay-0 duration-100 transform ${
          props.expanded ? "rotate-90" : "rotate-0"
        }`}
        onClick={props.onToggle}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </TextButton>
  );
};

export default ToggleArrow;
