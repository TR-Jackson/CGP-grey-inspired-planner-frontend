import React from "react";

import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`transform duration-500 ease-in-out transition-all ${
          props.show
            ? "-translate-y-32 opacity-100"
            : "translate-y-screen opacity-0"
        }  bg-gray-100 z-50 w-3/5 max-h-4/5 p-8 pt-2 rounded-2xl shadow-sm overflow-auto absolute`}
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
