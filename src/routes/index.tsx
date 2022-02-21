import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from "../contextsAuth/AuthProvider";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";

function Routes() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default Routes;
