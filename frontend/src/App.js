import React, { Component } from "react";
// Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { store } from "./Store";
import { Provider } from "react-redux";
//
import jwt_decode from "jwt-decode";
// Utilities
import setAuthToken from "./utils/setAuthToken";
// Actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
// Components
import { Login, Register } from "./components/auth";
import { PrivateRoute } from "./components/common";
import { CreateProfile } from "./components/create-profile";
import Dashboard from "./components/dashboard/Dashboard";
import { Navbar, Landing, Footer } from "./components/layout";
import "./App.css";

//Checks for token
const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  //set auth token header auth
  setAuthToken(jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(jwtToken);
  // Set User and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for Expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // CLear Current Profile
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
