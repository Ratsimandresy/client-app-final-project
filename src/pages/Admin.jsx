import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import "../styles/admin.css";
import {
  Accordion,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Radio,
  Table,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";

class Admin extends Component {
  state = {
    data: [],
    activeIndex: -1,
    categories: null,
    tags: null,
    users: null,
    events: null,
  };

  async componentDidMount() {
    try {
      const categoriesApi = await apiHandler.getAll("/api/admin/categories");
      const tagsApi = await apiHandler.getAll("/api/admin/tags");
      const usersApi = await apiHandler.getAll("/api/admin/users");
      const eventsApi = await apiHandler.getAll("/api/admin/events");

      this.setState({
        categories: categoriesApi,
        tags: tagsApi,
        users: usersApi,
        events: eventsApi,
      });
      console.log(this.state);
    } catch (errApi) {
      console.log(errApi);
    }
  }

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleDelete = (event, categoryId) => {
    const categoriesArray = this.state.categories;
    console.log(categoriesArray);
    apiHandler
      .deleteone(`/api/admin/categories/${categoryId}`)
      .then((apiRes) => {
        const newCategoriesArray = categoriesArray.filter(
          (item) => item._id !== categoryId
        );
        console.log(newCategoriesArray);

        this.setState({ categories: newCategoriesArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  handleDeleteTag = (event, tagId) => {
    const tagsArray = this.state.tags;
    console.log(tagsArray);
    apiHandler
      .deleteone(`/api/admin/tags/${tagId}`)
      .then((apiRes) => {
        const newTagsArray = tagsArray.filter((item) => item._id !== tagId);
        console.log(newTagsArray);

        this.setState({ tags: newTagsArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  handleDeleteUser = (event, userId) => {
    const usersArray = this.state.users;
    console.log(userId);
    apiHandler
      .deleteone(`/api/admin/users/${userId}`)
      .then((apiRes) => {
        const newUsersArray = usersArray.filter((item) => item._id !== userId);

        console.log(newUsersArray);

        this.setState({ users: newUsersArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  handleDeleteEvent = (event, eventId) => {
    const eventsArray = this.state.events;
    console.log(eventId);
    apiHandler
      .deleteone(`/api/admin/events/${eventId}`)
      .then((apiRes) => {
        console.log(eventsArray);
        const newEventsArray = eventsArray.filter(
          (item) => item._id !== eventId
        );

        console.log(newEventsArray);

        this.setState({ events: newEventsArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  render() {
    if (!this.state.categories) {
      return (
        <div>
          {" "}
          <Loader active inline="centered" />{" "}
        </div>
      );
    }
    return (
      <div id="admin-main-container">
        <div className="admin-forms-h1">
          <h1>My dashboard</h1>
        </div>
        <div id="admin-accordion-container">
          <Accordion fluid styled>
            {/* /////////////////// CATEGORIES /////////////////////////////////////////////////////////////////////////////// */}

            <Accordion.Title
              active={this.state.activeIndex === 0}
              index={0}
              onClick={this.handleClickAccordion}
            >
              <Icon name="dropdown" />
              Categories
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 0}>
              <Link to="Admin/category-create">
                <Button color="teal" fluid size="large">
                  Create a new category
                </Button>
              </Link>

              <Table fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.categories.map((category) => (
                    <Table.Row key={category.label}>
                      <Table.Cell>
                        {" "}
                        <p>{category.label}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`Admin/category-edit/${category._id}`}>
                          <button>
                            <Icon name="edit" />
                          </button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={(e) => {
                            this.handleDelete(e, category._id);
                          }}
                        >
                          <Icon disabled name="trash" />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Accordion.Content>

            {/* /////////////////// TAGS /////////////////////////////////////////////////////////////////////////////// */}

            <Accordion.Title
              active={this.state.activeIndex === 1}
              index={1}
              onClick={this.handleClickAccordion}
            >
              <Icon name="dropdown" />
              Tags
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 1}>
              <Link to="Admin/tag-create">
                <Button color="teal" fluid size="large">
                  Create a new tag
                </Button>
              </Link>

              <Table fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.tags.map((tag) => (
                    <Table.Row key={tag.label}>
                      <Table.Cell>
                        {" "}
                        <p>{tag.label}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`Admin/tag-edit/${tag._id}`}>
                          <button>
                            <Icon name="edit" />
                          </button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={(e) => {
                            this.handleDeleteTag(e, tag._id);
                          }}
                        >
                          <Icon disabled name="trash" />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Accordion.Content>

            {/* ////////////////// USERS //////////////////////////////////////////////////////////////////////////////// */}

            <Accordion.Title
              active={this.state.activeIndex === 2}
              index={2}
              onClick={this.handleClickAccordion}
            >
              <Icon name="dropdown" />
              Users
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 2}>
              <Link to="Admin/user-create">
                <Button color="teal" fluid size="large">
                  Create a new user
                </Button>
              </Link>

              <Table fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pseudo</Table.HeaderCell>
                    <Table.HeaderCell>First name</Table.HeaderCell>
                    <Table.HeaderCell>Last name</Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>email</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.users.map((user) => (
                    <Table.Row key={user._id}>
                      <Table.Cell>
                        {" "}
                        <p>{user.pseudo}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{user.firstName}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{user.lastName}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{user._id}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{user.email}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{user.city}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`Admin/user-edit/${user._id}`}>
                          <button>
                            <Icon name="edit" />
                          </button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={(e) => {
                            this.handleDeleteUser(e, user._id);
                          }}
                        >
                          <Icon disabled name="trash" />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Accordion.Content>

            {/* ////////////////// EVENTS //////////////////////////////////////////////////////////////////////////////// */}

            <Accordion.Title
              active={this.state.activeIndex === 3}
              index={3}
              onClick={this.handleClickAccordion}
            >
              <Icon name="dropdown" />
              Events
            </Accordion.Title>
            <Accordion.Content active={this.state.activeIndex === 3}>
              <Link to="Admin/event-create">
                <Button color="teal" fluid size="large">
                  Create a new event
                </Button>
              </Link>

              <Table fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.events.map((event) => (
                    <Table.Row key={event._id}>
                      <Table.Cell>
                        {" "}
                        <p>{event.name}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{event.location.formattedAddress}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {" "}
                        <p>{event.userId}</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`Admin/event-edit/${event._id}`}>
                          <button>
                            <Icon name="edit" />
                          </button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={(e) => {
                            this.handleDeleteEvent(e, event._id);
                          }}
                        >
                          <Icon disabled name="trash" />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default Admin;
