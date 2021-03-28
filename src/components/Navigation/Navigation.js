import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

const Navigation = (props) => {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
