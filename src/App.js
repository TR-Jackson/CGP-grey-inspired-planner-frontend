import React from "react";
import { Redirect, Route } from "react-router-dom";

import List from "./containers/List/List";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Route path="/" component={List} exact />
      <Redirect to="/" />
    </div>
  );
};

export default App;
