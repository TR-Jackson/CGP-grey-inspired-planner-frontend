import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-12 flex justify-center shadow-sm fixed">
      <NavLink
        className="inline-block cursor-pointer text-bold text-white p-3 hover:text-gray-200"
        to="/"
        exact
      >
        Home
      </NavLink>
    </div>
  );
};

export default Navigation;
