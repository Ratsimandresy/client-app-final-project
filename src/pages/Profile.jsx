import React from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import { Table, Button, Icon, Card, Accordion } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import "../styles/profileUser.css";

class Profile extends React.Component {
  state = {
    userEvents: [],
    isLoading: true,
    activeIndex: 0
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/event")
      .then((apiRes) => {
        const userEvents = apiRes.filter(
          (event) => event.userId === this.props.context.user._id
        );
        this.setState({ userEvents: userEvents, isLoading: false });
      })
      .catch();
  }

  handleClick = (event) => {
    console.log("yooooooooooooooo");
  };

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

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

    return (
      <div className="container">
        <div className="page page-profile">
        
          <h1>Mon profil</h1>
          <Card fluid>
            <div className="card-profile">

              <div className="card-profile-visu">
                <img src={user.profilImage} alt="profile" width="140px" />
              </div>
              
              <div className="card-profile-content">
                <h2>{user.firstName} {user.lastName}</h2>
                <p><span>pseudo :</span>{user.pseudo}</p>
                <p><span>email :</span>{user.email}</p>
                <p><span>age : </span>{user.age} ans</p>
                <p><span>description : </span>{user.description}</p>
                <p><span>adresse :</span> {user.address}</p>
                <div className="actions-btn">
                  <Link className="link-profil btn btn-edit" to="/profile/edit">
                    Modifier mon profil
                  </Link>
                </div>
              </div>
            </div> 
          </Card>

        

        <h2>Mes événements</h2>
        
        <Accordion styled>
        {this.state.userEvents.length > 0 && (
          <>
          <Accordion.Title
            active={this.state.activeIndex === 0}
            index={0}
            onClick={this.handleClickAccordion}
          >
            <Icon name='dropdown' />
            My events
          </Accordion.Title>

          <Accordion.Content active={this.state.activeIndex === 0}>
          
            {this.state.userEvents.map((userEvent) => (
             
                <div className="event">
                  <img src="" alt="" />
                  <div className="content-event">
                    <h3 className="event-title">Title event</h3>
                    <p>Description event...</p>
                    <div className="actions-btn">
                      <button className="btn btn-show">
                      <Icon name='eye' />Show
                      </button>

                      <button className="btn btn-edit">
                      <Icon name='pencil' />Edit
                      </button>

                      <button className="btn btn-delete">
                      <Icon name='trash alternate' />Delete
                      </button>
                    </div>
                  </div>
                </div>
              
            ))}
          </Accordion.Content>
          </>
        )}

          <Accordion.Title
            active={this.state.activeIndex === 1}
            index={1}
            onClick={this.handleClickAccordion}
          >
            <Icon name='dropdown' />
            My comments
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 1}>
            <p>
              There are many breeds of dogs. Each breed varies in size and
              temperament. Owners often select a breed of dog that they find to be
              compatible with their own lifestyle and desires from a companion.
            </p>
          </Accordion.Content>

          <Accordion.Title
            active={this.state.activeIndex === 1}
            index={1}
            onClick={this.handleClickAccordion}
          >
            <Icon name='dropdown' />
            My messages
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 1}>
            <p>
              There are many breeds of dogs. Each breed varies in size and
              temperament. Owners often select a breed of dog that they find to be
              compatible with their own lifestyle and desires from a companion.
            </p>
          </Accordion.Content>
        </Accordion>

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
                        <Link to={`/edit-event/${userEvent._id}`}>
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
