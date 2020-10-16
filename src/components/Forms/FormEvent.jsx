import React, { Component } from "react";
import { Form, Select, TextArea, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import "../../styles/FormEvent.css";

const defaultOptions = [
  { key: "sp", value: "sp", text: "sport" },
  { key: "mu", value: "mu", text: "music" },
  { key: "np", value: "np", text: "nice place" },
  { key: "pl", value: "pl", text: "plan" },
];

export default class FormEvent extends Component {
  state = {
    name: "",
    description: "",
    mainImageUrl: "",
    location: "",
    infos: "",
    city: "",
    categories: [],
  };

    componentDidMount() {
      apiHandler
      .getAll("/api/categories/")
      .then((apiRes) => {
        this.setState({ categories : apiRes })
        console.log(this.state.categories)
        })
      .catch((err) => console.log(err));
      }

  handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    console.log(this.state);
    const value =
      event.target.type === "select"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleCancel = (e) => {
    console.log("canceled!!!!!!!");
    console.log(this.props);
    console.log(e.target);
    this.props.history.push("/profil");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submittinggggg");

    const fd = new FormData();

    for (const key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .createOne("/api/event/", fd)
      .then((apiRes) => {
        this.props.history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="EventForm">
        <Form onSubmit={this.handleSubmit} className="formContainer">
          <Form.Group>
            <Form.Input
              name="name"
              onChange={this.handleChange}
              label=" name"
              placeholder="file event name"
              width={5}
            />

            <Form.Input
              onChange={this.handleChange}
              name="infos"
              label="informations"
              placeholder="date format"
              width={5}
            />
          </Form.Group>
          {/* <Form.Group>
            <Select
              name="category"
              label="category"
              placeholder="category"
              width={6}
              options={this.state.categories}
            />
          </Form.Group> */}
          <select name="category" id="category" onChange={this.handleChange}>
            <option value="-1" disabled>
              select a category
            </option>
            {this.state.categories.map(category => (
              <option value={category._id}>{category.label}</option>
            )
          )}
          </select>
          <Form.Group>
            <Form.Input
              name="location"
              onChange={this.handleChange}
              label="location"
              placeholder="2 Wide"
              width={7}
            />
            <Form.Input
              name="city"
              onChange={this.handleChange}
              label="city"
              placeholder="city"
              width={7}
            />
          </Form.Group>
          <Form.Group>
            <Select
              name="tag"
              placeholder="tag"
              width={6}
              options={defaultOptions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              name="mainImageUrl"
              onChange={this.handleChange}
              label="Picture"
              type="file"
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <TextArea
              name="description"
              onChange={this.handleChange}
              placeholder="Describe your post/event"
              style={{ minHeight: 90, width: 600 }}
            />
          </Form.Group>
          <Button.Group>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button.Or />
            <Button color="teal">Add new event</Button>
          </Button.Group>
        </Form>
      </div>
    );
  }
}
