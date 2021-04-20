import React from "react";

import ItemSteps from "../ItemSteps/ItemSteps";
import TextButton from "../UI/TextButton/TextButton";
import ToggleArrow from "../UI/ToggleArrow/ToggleArrow";

const listItem = (props) => {
  return (
    <div
      className={`bg-indigo-300 w-5/6 p-2 my-6 flex m-auto shadow-md rounded-md mb-0 hover:bg-indigo-200 h-auto`}
    >
      <div className="pt-0.5">
        <TextButton onClick={props.onDelete} tip="Delete Item">
          <svg
            className="m-0 h-6 hover:fill-current hover:text-gray-100"
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
            className="m-0 h-6 hover:fill-current hover:text-gray-100"
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
        <h1 className="font-semibold text-lg">{props.title}</h1>
        {props.expanded &&
          props.steps.map((step) => {
            return <ItemSteps steps={step} key={props.steps.indexOf(step)} />;
          })}
        <p className="font-semibold text-lg">
          Due: {props.day}/{props.month}/{props.year}
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
