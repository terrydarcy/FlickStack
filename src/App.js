import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Messenger from "./components/Messenger";
import Swipe from "./pages/Swipe";
import GroupsPanel from "./components/GroupsPanel";

function App() {
  return (
    <Router>
      <Header />
      <div className="mainBodyContainer">
        <div className="group-mainSwipe-container">
          <GroupsPanel />

          <div className="bodyFlex">
            <div className="pageContents">
              <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/login" exact component={Login} />
                <Route path="/createAccount" exact component={CreateAccount} />
                <Route path="/messenger" exact component={Messenger} />
                <Route path="/" exact component={Swipe} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
