import React from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import { Table, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../styles/profileUser.css";

class Profile extends React.Component {
  state = {
    userEvents: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/event")
      .then((apiRes) => {
        const userEvents = apiRes.filter(event => event.userId === this.props.context.user._id);
        this.setState({ userEvents : userEvents })
      })
      .catch();
  }

  handleDelete = (event) => {
    this.state.userEvents.map((userEvent) => {
      console.log(event.target.id);
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
                  const userEvents = apiRes.filter(event => event.userId === this.props.context.user._id);
                  this.setState({ userEvents : userEvents })
                })
                .catch()
            })
            .catch();
        })
        .catch((apiError) => {
          console.log(apiError);
        });
    });
  };

  render() {
    console.log(this.props.context.user.email);
    const { context } = this.props;
    const { user } = context;
    console.log(user.email);
    const userEvents2 = this.state.userEvents;
    console.log(userEvents2);

    return (
      <div>
        <h1>Mon profil</h1>
        <br />
        <img src={user.profilImage} alt="profile" width="140px" />
        <h2>
          {user.firstName} {user.lastName}
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
          <span>age : </span>
          {user.age} ans
        </p>
        <p>
          <span>description : </span>
          {user.description}
        </p>
        <p>
          <span>adresse :</span> {user.address}
        </p>

        <Link className="link-profil" to="/profile/edit">
          Modifier mon profil
        </Link>

        <h2>Mes événements</h2>
        <div id="profile-table-container">
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
                      <Button className="icon">
                        <Link to="/edit-event">
                          <Icon name="edit" />
                        </Link>
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <Button onClick={this.handleDelete} id={userEvent._id} className="icon">
                      <Icon name='trash alternate outline' />
                    </Button> */}
                      <button onClick={this.handleDelete} id={userEvent._id}>
                        DELETE
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
