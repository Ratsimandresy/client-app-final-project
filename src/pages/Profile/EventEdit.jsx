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

class EventEdit extends Component {
  state = {
    name: "",
    description: "",
    city: "",
    location: "",
    infos: "",
  };

  componentDidMount() {
    console.log("this is the props ===>>>>");
    apiHandler
      .getOne("/api/event/" + this.props.match.params.id)
      .then((apiRes) => {
        console.log("<================>", apiRes.data);
        const { name, infos, description, city } = apiRes.data;
        this.setState({ name, infos, description, city });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  isValidInput = (key) => {
    if (this.state[key] === "") {
      return false;
    } else return true;
  };

  handleCancel = () => {
    this.props.history.push("/profile");
    this.setState({ event: this.state.event });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submittinggggsg");
    console.log(this.props);
    const fd = new FormData();

    for (const key in this.state) {
      fd.append(key, this.state[key]);
    }
    console.log(fd);
    apiHandler
      .updateOne("/api/event/" + this.props.match.params.id, fd)
      .then((apiRes) => {
        console.log("apires ====>>>>>>", apiRes);
        this.setState(apiRes);
        this.props.history.push("/profile");
      })
      .catch((err) => console.log("error", err));
  };

  render() {
    return (
      <div className="EventForm">
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Form onSubmit={this.handleSubmit} className="formContainer">
          <Form.Group>
            <Form.Input
              value={this.state.name}
              id="name"
              label="name"
              name="name"
              autoComplete="off"
              onChange={this.handleChange}
              placeholder={"fill event name"}
              width={5}
            />

            <Form.Input
              value={this.state.infos}
              onChange={this.handleChange}
              name="infos"
              label="infos"
              autoComplete="off"
              placeholder="date format"
              width={5}
            />
          </Form.Group>
          <Form.Group>
            <Select
              // value={this.state.category}
              onChange={this.handleChange}
              name="category"
              label="category"
              placeholder="category"
              autoComplete="off"
              width={6}
              options={defaultOptions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              value={this.state.location}
              name="location"
              onChange={this.handleChange}
              autoComplete="off"
              label="location"
              placeholder="2 Wide"
              width={7}
            />
            <Form.Input
              value={this.state.city}
              name="city"
              onChange={this.handleChange}
              label="city"
              autoComplete="off"
              placeholder="city"
              width={7}
            />
          </Form.Group>
          {/* <Form.Group>
            <Select
              // value={this.state.tag}
              name="tag"
              placeholder="tag"
              onChange={this.handleChange}
              autoComplete="off"
              width={6}
              options={defaultOptions}
            />
          </Form.Group> */}
          {/* <Form.Group>
            <Form.Input
              // value={this.state.mainImageUrl}
              name="mainImageUrl"
              onChange={this.handleChange}
              autoComplete="off"
              label="Picture"
              type="file"
              width={8}
            />
          </Form.Group> */}
          <Form.Group>
            <TextArea
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
              placeholder="Describe your post/event"
              autoComplete="off"
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

export default EventEdit;
