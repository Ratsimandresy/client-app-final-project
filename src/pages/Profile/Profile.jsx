import React from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import { Table, Button, Icon, Card, Accordion } from "semantic-ui-react";
import EventItem from "../../components/Profile/EventItem";
import { Link } from "react-router-dom";
import "../../styles/profileUser.css";

class Profile extends React.Component {
  state = {
    userEvents: [],
    isLoading: true,
    activeIndex: -1,
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
    console.log(data);
    if (data) {
      this.setState({
        user: data.currentUser,
        userEvents: data.userEvents,
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
      this.setState({
        userEvents: fileteredArray,
      });
    } catch (errApi) {
      console.log(errApi);
    }

    //console.log(deletedEvent);
  };

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
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
      <div className="profile-main-container">
        <div className="profile-wrap">
          {!this.state.isLoading && (
            <>
              <div className="profile-title-h1">
                <h2>
                  Welcome {this.state.user.firstName} {this.state.user.lastName}
                </h2>
              </div>

              <Card fluid>
                <div className="card-profile">
                  <div className="card-profile-visu">
                    <img
                      src={this.state.user.profilImage}
                      alt="profile"
                    />
                  </div>

                  <div className="card-profile-content">
                    {/* <h2>
                      {this.state.user.firstName} {this.state.user.lastName}
                    </h2> */}
                    <div>
                    <p>
                      <span>pseudo : </span>
                      {this.state.user.pseudo}
                    </p>
                    <p>
                      <span>email : </span>
                      {this.state.user.email}
                    </p>
                    <p>
                      <span>age : </span>
                      {this.state.user.age} ans
                    </p>
                    <p>
                      <span>description : </span>
                      {this.state.user.description}
                    </p>
                    <p>
                      <span>address : </span> {this.state.user.address}
                    </p>
                    </div>
                    <div className="action-btn">
                      <Link
                        // className="link-profil btn btn-edit"
                        to="/profile/edit"
                      >
                        <Button basic color="teal">
                          Edit my profile
                        </Button>
                        
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          <div className="accordion-container"> 

          <Accordion styled>
            {this.state.userEvents.length > 0 && (
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
                  {this.state.userEvents.map((userEvent) => (
                    <EventItem
                      key={userEvent._id}
                      {...userEvent}
                      handlerDelete={this.handlerClickDelete}
                    />
                  ))}
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
                There are many breeds of dogs. Each breed varies in size and
                temperament. Owners often select a breed of dog that they find
                to be compatible with their own lifestyle and desires from a
                companion.
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
                There are many breeds of dogs. Each breed varies in size and
                temperament. Owners often select a breed of dog that they find
                to be compatible with their own lifestyle and desires from a
                companion.
              </p>
            </Accordion.Content>
          </Accordion>
          </div>

          {/* 
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Ville</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Note</Table.HeaderCell>
                <Table.HeaderCell>Modifier</Table.HeaderCell>
                <Table.HeaderCell>Supprimer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.userEvents &&
                this.state.userEvents.map((userEvent) => (
                  <Table.Row key={userEvent.name}>
                    <Table.Cell>{userEvent.name}</Table.Cell>
                    <Table.Cell>{userEvent.city}</Table.Cell>
                    <Table.Cell>{userEvent.description}</Table.Cell>
                    <Table.Cell>{userEvent.noteAverage}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={this.handleClick}
                        idevent={userEvent._id}
                        className="icon"
                      >
                        <Link  to={`/edit-event/${userEvent._id}/edit`}>
                          <Icon name="edit" />
                        </Link>
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <Button onClick={this.handleDelete} id={userEvent._id} className="icon">
                      <Icon name='trash alternate outline' />
                    </Button>
                    <button onClick={this.handleDelete} id={userEvent._id}>DELETE</button>
                  </Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
       
          </Table>
          */}
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
