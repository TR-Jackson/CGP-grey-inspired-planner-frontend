import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${props.className} w-${
        props.width
      } rounded-md shadow-md font-semibold m-auto text-center p-2 cursor-pointer
${
  props.disabled
    ? "cursor-not-allowed bg-gray-200 text-gray-600"
    : props.danger
    ? "bg-red-700 hover:bg-red-500 text-gray-200"
    : "bg-gradient-to-r w-1/2 from-blue-500 to-blue-400 hover:from-blue-300 hover:to-blue-200"
}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
