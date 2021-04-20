import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-red-400 w-full h-12 flex justify-center shadow-sm fixed">
      <NavLink
        className="inline-block cursor-pointer text-bold text-gray-50 p-3 hover:text-gray-700"
        to="/"
        exact
      >
        Home
      </NavLink>
    </div>
  );
};

export default Navigation;
