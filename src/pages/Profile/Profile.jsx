import React from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import { Table, Button, Icon, Card, Accordion } from "semantic-ui-react";
import EventItem from "../../components/Profile/EventItem";
import FavoriteEventItem from "../../components/Profile/FavoriteEventItem";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../components/Loader/spinnerLoader";
import "../../styles/profileUser.css";

class Profile extends React.Component {
  state = {
    userEvents: [],
    favEvents: [],
    isLoading: true,
    activeIndex: 0,
    user: null,
  };

  async componentDidMount() {
    /*
    apiHandler
      .getAll("/api/event")
      .then((apiRes) => {
        const userEvents = apiRes.filter(
          (event) => event.userId === this.props.context.user._id
        );
        this.setState({ userEvents: userEvents, isLoading: false });
      })
      .catch();
    */
    const data = await apiHandler.getMe("api/user/me");
    console.log("-----USER-----", data);
    if (data) {
      this.setState({
        user: data,
        userEvents: data.userEvents,
        favEvents: data.events,
        isLoading: false,
      });
    }
  }

  /*
  async componentDidUpdate(prevProps, prevState) {
    if ((prevState.userEvents !== this.state.userEvents) 
      || (prevState.user !== this.state.user))
    {
      console.log('data change');
      const upDatedUser = await apiHandler.getMe("api/user/me");
      this.setState({
        userEvents: this.state.userEvents, 
        user: upDatedUser,
        isLoading: false 
      });
    }
  }
  */

  handleClick = (event) => {};

  handlerClickDelete = async (id) => {
    try {
      console.log(id);
      const deletedEvent = await apiHandler.delete_one("/api/event/", id);
      const newUserEvents = [...this.state.userEvents];
      console.log(newUserEvents);
      const fileteredArray = newUserEvents.filter((e) => {
        if (e._id !== id) {
          return e;
        }
      });

      console.log(fileteredArray);
      this.setState({ userEvents: fileteredArray });
    } catch (errApi) {
      console.log(errApi);
    }

    // console.log(deletedEvent);
  };

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handlerClickDeleteFavEvent = (favEventId) => {
    console.log("delete fav event");
    console.log(favEventId);

    const currentFavEvents = [...this.state.user.favorites];
    console.log("currentFavEvents: -----", currentFavEvents);
    const newFavEvents = currentFavEvents.filter((e) => e._id !== favEventId);
    console.log("currentFavEvents after filter: -----", newFavEvents);

    apiHandler
      .updateOne("api/user/fav-event", { favorites: newFavEvents })
      .then((resApi) => {
        console.log("resApi-----", resApi);
        this.setState({});
      })
      .catch((errApi) => {
        console.log(errApi);
      });
  };

  handleDelete = (event) => {
    this.state.userEvents.map((userEvent) => {
      // console.log(event.target.id);
      // console.log(event.target)
      return apiHandler
        .deleteone(`/api/event/${event.target.id}`)
        .then((apiRes) => {
          // this.props.history.push("/profile"); //redirect vers la page /profile juste après avoir edité l'événement
          // console.log(apiRes);
          apiHandler
            .getAll("/api/event")
            .then((apiRes) => {
              // this.props.history.push("/profile"); //redirect vers la page /profile juste après avoir edité l'événement
              // console.log(apiRes);
              apiHandler
                .getAll("/api/event")
                .then((apiRes) => {
                  const userEvents = apiRes.filter(
                    (event) => event.userId === this.props.context.user._id
                  );
                  this.setState({ userEvents: userEvents });
                })
                .catch();
            })
            .catch();
        })
        .catch((apiError) => {
          console.log(apiError);
        });
    });
  };

  render() {
    // console.log(this.props.context.user.email);
    const { context } = this.props;
    const { user } = context;
    // console.log(user.email);
    // const userEvents2 = this.state.userEvents;
    // console.log(this.state.userEvents);
    // console.log(this.state.userEvents[0]);
    console.log(this.props);

    return (
      <div className="container">
        <div className="page page-profile">
          {!this.state.isLoading && (
            <>
              {/* <Card fluid> */}
              <div className="card-profile">
                <h1>
                  Welcome {user.firstName} {user.lastName}
                </h1>
                <div className="card-profile-visu">
                  <img src={user.profilImage} alt="profile" width="140px" />
                </div>

                <div className="card-profile-content">
                  <h2>
                    {user.firstName}
                    {user.lastName}
                  </h2>
                  <p>
                    <span>pseudo :</span>
                    {user.pseudo}
                  </p>
                  <p>
                    <span>email :</span>
                    {user.email}
                  </p>
                  <p>
                    <span>age :</span>
                    {user.age} ans
                  </p>
                  <p>
                    <span>description :</span>
                    {user.description}
                  </p>
                  <p>
                    <span>Address :</span>
                    {user.address}
                  </p>
                  <p>
                    <span>CP :</span>
                    {user.cp}
                  </p>
                  <p>
                    <span>City :</span>
                    {user.city}
                  </p>

                  <div className="actions-btn">
                    <Link
                      className="link-profil btn btn-edit"
                      to="/profile/edit"
                    >
                      Edit my profile
                    </Link>
                  </div>
                </div>
              </div>
              {/* </Card> */}

              {/* <h2>My events</h2> */}
              {this.state.user && (
                <Accordion styled>
                  {this.state.user.events.length > 0 && (
                    <>
                      <Accordion.Title
                        active={this.state.activeIndex === 0}
                        index={0}
                        onClick={this.handleClickAccordion}
                      >
                        <Icon name="dropdown" />
                        My events
                      </Accordion.Title>

                      <Accordion.Content active={this.state.activeIndex === 0}>
                        {this.state.user.events.map((userEvent) => (
                          <EventItem
                            key={userEvent._id}
                            event={userEvent}
                            handlerDelete={this.handlerClickDelete}
                          />
                        ))}{" "}
                      </Accordion.Content>
                    </>
                  )}

                  <Accordion.Title
                    active={this.state.activeIndex === 1}
                    index={1}
                    onClick={this.handleClickAccordion}
                  >
                    <Icon name="dropdown" />
                    My comments
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === 1}>
                    <p>
                      There are many breeds of dogs. Each breed varies in size
                      and temperament. Owners often select a breed of dog that
                      they find to be compatible with their own lifestyle and
                      desires from a companion.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    active={this.state.activeIndex === 2}
                    index={2}
                    onClick={this.handleClickAccordion}
                  >
                    <Icon name="dropdown" />
                    My messages
                  </Accordion.Title>
                  <Accordion.Content active={this.state.activeIndex === 2}>
                    <p>
                      There are many breeds of dogs. Each breed varies in size
                      and temperament. Owners often select a breed of dog that
                      they find to be compatible with their own lifestyle and
                      desires from a companion.
                    </p>
                  </Accordion.Content>
                  <Accordion.Title
                    active={this.state.activeIndex === 3}
                    index={3}
                    onClick={this.handleClickAccordion}
                  >
                    <Icon name="dropdown" />
                    My Favorites Events
                  </Accordion.Title>

                  {this.state.user.favorites.length > 0 && (
                    <>
                      <Accordion.Content active={this.state.activeIndex === 3}>
                        {this.state.user.favorites.map((userFavEvent) => (
                          <FavoriteEventItem
                            key={userFavEvent._id}
                            event={userFavEvent}
                            deleteFavEvent={this.handlerClickDeleteFavEvent}
                          />
                        ))}
                      </Accordion.Content>
                    </>
                  )}
                </Accordion>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
