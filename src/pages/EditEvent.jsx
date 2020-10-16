import React, { Component } from "react";
import { Form, Select, TextArea, Button } from "semantic-ui-react";
import apiHandler from "../api/apiHandler";
import "../styles/FormEvent.css";
// import { withUser } from "../components/Auth/withUser";

const defaultOptions = [
  { key: "sp", value: "sp", text: "sport" },
  { key: "mu", value: "mu", text: "music" },
  { key: "np", value: "np", text: "nice place" },
  { key: "pl", value: "pl", text: "plan" },
];
export default class EditEvent extends Component {
  state = {
    name: "",
    description: "",
    mainImageUrl: "",
    location: "",
    infos: "",
    city: "",
  };

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
      console.log(this.props)
    return (
      <div className="EventForm">
        <Form onSubmit={this.handleSubmit} className="formContainer">
          <Form.Group>
            <Form.Input
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              label=" name"
              placeholder="file event name"
              width={5}
            />

            <Form.Input
              value={this.state.infos}
              onChange={this.handleChange}
              name="infos"
              label="informations"
              placeholder="date format"
              width={5}
            />
          </Form.Group>
          <Form.Group>
            <Select
              value={this.state.category}
              name="category"
              label="category"
              placeholder="category"
              width={6}
              options={defaultOptions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              value={this.state.location}
              name="location"
              onChange={this.handleChange}
              label="location"
              placeholder="2 Wide"
              width={7}
            />
            <Form.Input
              value={this.state.city}
              name="city"
              onChange={this.handleChange}
              label="city"
              placeholder="city"
              width={7}
            />
          </Form.Group>
          <Form.Group>
            <Select
              value={this.state.tag}
              name="tag"
              placeholder="tag"
              width={6}
              options={defaultOptions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              value={this.state.mainImageUrl}
              name="mainImageUrl"
              onChange={this.handleChange}
              label="Picture"
              type="file"
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <TextArea
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
              placeholder="Describe your post/event"
              style={{ minHeight: 90, width: 600 }}
            />
          </Form.Group>
          <Button.Group>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button.Or />
            <Button color="teal">Update</Button>
          </Button.Group>
        </Form>
      </div>
    );
  }
}
