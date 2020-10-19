import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllEvents from "./pages/AllEvents";
import AllUsers from "./pages/AllUsers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/Profile/EditProfile";
import ProfileEventEdit from "./pages/Profile/EventEdit";
import ProfileEventDetails from "./pages/Profile/EventDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NavMain from "./components/NavMain";
import FormEvent from "./components/Forms/FormEvent";
import SingleUser from "./pages/SingleUser";
import SingleEvent from "./pages/SingleEvent";
import Comment from "../src/components/Comment/Comment";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/all-events" component={AllEvents} />
        <Route exact path="/all-users" component={AllUsers} />
        <Route exact path="/add-event" component={FormEvent} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/all-users/:userId" component={SingleUser} />
        <Route exact path="/all-events/:eventId" component={SingleEvent} />
        <Route exact path="/comment" component={Comment} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/edit/" component={ProfileEdit} />
        <ProtectedRoute
          exact
          path="/profile/event/:id/edit"
          component={ProfileEventEdit}
        />
        <ProtectedRoute
          exact
          path="/profile/event/:id/details"
          component={ProfileEventDetails}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
