import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import List from "./containers/List/List";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={List} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
