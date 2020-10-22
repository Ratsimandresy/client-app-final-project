import React, { Component } from "react";
import { Form, Segment, TextArea, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import AutoComplete from "../utils/AutoComplete";
import { Link } from "react-router-dom";
import { buildFormData } from "../utils/buildFormData";
import "../../styles/admin.css";

class FormCreateUser extends Component {
  state = {
    formattedAddress: null,
    address: null,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;
    this.setState({ [key]: value }, () => console.log(this.state));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    console.log(this.state);

    const fd = new FormData();

    for (let key in this.state) {
      fd.append(key, this.state[key]);
    }

    apiHandler
      .createOne("/api/admin/users", fd)
      .then((apiRes) => {
        this.props.history.push("/Admin");
        console.log(apiRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePlace = (place) => {
    this.setState(
      { formattedAddress: place.place_name, address: place.place_name },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <div className="admin-forms-main-container">
        <div className="admin-forms-h1">
          <h2>Create a new user</h2>
        </div>
        <div className="admin-forms-form">
          <Form
            size="large"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
            <Segment stacked>
              <Form.Input
                fluid
                icon="heart"
                name="firstName"
                type="text"
                iconPosition="left"
                placeholder="firstName"
              />
              <Form.Input
                fluid
                icon="heart"
                type="text"
                name="lastName"
                iconPosition="left"
                placeholder="lastName"
              />
              <Form.Input
                fluid
                icon="heart"
                name="email"
                iconPosition="left"
                placeholder="email"
              />
              <Form.Input
                fluid
                icon="heart"
                name="password"
                type="password"
                iconPosition="left"
                placeholder="password"
              />
              <Form.Input
                fluid
                icon="heart"
                name="pseudo"
                type="text"
                iconPosition="left"
                placeholder="pseudo"
              />
              <Form.Input
                fluid
                type="number"
                icon="heart"
                name="age"
                iconPosition="left"
                placeholder="age"
              />
              <Form.Input>
                <TextArea
                  fluid
                  icon="heart"
                  name="description"
                  type="text"
                  iconPosition="left"
                  placeholder="description"
                />
              </Form.Input>
              <Form.Input
                fluid
                icon="heart"
                name="profilImage"
                iconPosition="left"
                placeholder="profilImage"
                type="file"
              />
              <Form.Input
                fluid
                icon="heart"
                name="city"
                iconPosition="left"
                placeholder="city"
                type="text"
              />
              <div>
                <AutoComplete onSelect={this.handlePlace} />
              </div>
              <select name="gender">
                <option value="">Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
              <Button color="teal" fluid size="large">
                Create !
              </Button>
            </Segment>
          </Form>
          <div className="admin-return-btn">
            <Link to="/Admin">
              <Button basic color="teal">
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FormCreateUser;
