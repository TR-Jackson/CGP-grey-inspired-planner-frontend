import React from "react";

const Backdrop = (props) => (
  <div
    className={`inset-0 duration-500 transition-opacity w-full h-full fixed bg-black ${
      props.show ? "opacity-50 z-20" : "opacity-0 -z-10"
    }`}
    onClick={props.clicked}
  ></div>
);

export default Backdrop;
