import React from "react";

import ItemSteps from "../ItemSteps/ItemSteps";
import TextButton from "../UI/TextButton/TextButton";
import ToggleArrow from "../UI/ToggleArrow/ToggleArrow";

const listItem = (props) => {
  return (
    <div
      className={`bg-blue-400 w-5/6 p-2 my-6 flex m-auto shadow-md rounded-md mb-0 hover:bg-blue-300 h-auto`}
    >
      <div className="pt-0.5">
        <TextButton onClick={props.onDelete} tip="Delete Item">
          <svg
            className="m-0 h-6 transition duration-300 ease-in-out text-white hover:fill-white transform hover:-translate-y-1 hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </TextButton>
        <TextButton onClick={props.onEdit} tip="Edit Item">
          <svg
            className="m-0 h-6 transition duration-300 ease-in-out text-white hover:fill-white transform hover:-translate-y-1 hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </TextButton>
      </div>
      <div className="flex flex-col space-y-0.5">
        <h1 className="font-semibold text-lg text-gray-50">{props.title}</h1>
        {props.expanded && <ItemSteps steps={props.steps} />}
        <p className="font-semibold text-lg text-white">
          Due: {props.day}/{props.month + 1}/{props.year}
        </p>
      </div>
      <div className={"flex-grow"}>
        <ToggleArrow
          expanded={props.expanded}
          height={6}
          onToggle={props.onToggle}
          mt={0}
        />
      </div>
    </div>
  );
};

export default listItem;
