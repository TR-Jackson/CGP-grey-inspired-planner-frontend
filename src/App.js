import React from "react";
import { Redirect, Route } from "react-router-dom";

import List from "./containers/List/List";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Route path="/" component={List} exact />
        <Redirect to="/" />
      </main>
    </React.Fragment>
  );
};

// fix formstate for steps

export default App;
