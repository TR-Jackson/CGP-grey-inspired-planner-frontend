import React from "react";

import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`absolute object-center transform duration-400 ease-in-out transition-all ${
          props.show ? "opacity-100" : "opacity-0"
        }  bg-gray-100 z-50 w-4/5 h-auto min-w-3/5 w-auto max-w-60 max-h-3/4 px-8 py-2 rounded-2xl shadow-sm overflow-auto`}
      >
        {props.children}
      </div>
      <Backdrop show={props.show} clicked={props.modalClosed} />
    </div>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
