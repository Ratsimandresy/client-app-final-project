import React from "react";
import { Switch, Route } from "react-router-dom";
import EditEvent from "../src/pages/EditEvent";
import Home from "./pages/Home";
import AllEvents from "./pages/AllEvents";
import AllUsers from "./pages/AllUsers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NavMain from "./components/NavMain";
import FormEvent from "./components/Forms/FormEvent";
import SingleUser from "./pages/SingleUser";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/all-events" component={AllEvents} />
        <Route exact path="/all-users" component={AllUsers} />
        <Route exact path="/add-event" component={FormEvent} />
        <Route exact path="/edit-event/:id" component={EditEvent} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/edit/" component={EditProfile} />
        <Route exact path="/all-users/:userId" component={SingleUser} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
