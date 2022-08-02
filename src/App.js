import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard";
import Auth from "./components/Auth";
import CreateAppointment from "./components/Patient/CreateAppointment";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

function App() {
  const { token, login, logout, userId, user } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/*" element={<Dashboard />} exact />
        <Route
          path="/create-appointement"
          element={<CreateAppointment />}
          exact
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Auth />} exact />
        <Route
          path="/create-appointement"
          element={<CreateAppointment />}
          exact
        />
      </Routes>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          user: user,
          login: login,
          logout: logout,
        }}
      >
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
