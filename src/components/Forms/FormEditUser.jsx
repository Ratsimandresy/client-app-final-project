import React, { Component } from "react";
import { Form, Segment, TextArea, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import AutoComplete from "../utils/AutoComplete";
import { buildFormData } from "../utils/buildFormData";
import "../../styles/admin.css";

class FormEditUser extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    pseudo: null,
    age: null,
    description: null,
    profilImage: null,
    address: null,
    city: null,
    formattedAddress: null,
    gender: null,
    newPassword: null,
  };

  componentDidMount() {
    console.log(this.props);

    apiHandler
      .getOne("/api/admin/users/", this.props.match.params.id)
      .then((apiRes) => {
        console.log(apiRes);

        this.setState({
          firstName: apiRes.firstName,
          lastName: apiRes.lastName,
          email: apiRes.email,
          password: apiRes.password,
          pseudo: apiRes.pseudo,
          age: apiRes.age,
          description: apiRes.description,
          profilImage: apiRes.profilImage,
          address: apiRes.address,
          city: apiRes.city,
          formattedAddress: apiRes.formattedAddress,
          gender: apiRes.gender,
        });
        console.log(this.state);
      });
  }

  handleChange = (event) => {
    const key = event.target.name;

    const value =
      event.target.type === "select"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    this.setState({ [key]: value }, () => {
      console.log(this.state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    const { httpResponse, ...data } = this.state;

    buildFormData(fd, data);

    apiHandler
      .updateOne("/api/admin/users/" + this.props.match.params.id, fd)
      .then((apiResLabel) => {
        this.props.history.push("/Admin");
        console.log(apiResLabel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="admin-forms-main-container">
        <div className="admin-forms-h1">
          <h1>Edit user</h1>
        </div>
        <div className="admin-forms-form">
          <Form
            size="large"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
            <Segment stacked>
              <Form.Input
                value={this.state.firstName}
                fluid
                name="firstName"
                label="First Name"
                type="text"
                iconPosition="left"
                placeholder="firstName"
              />
              <Form.Input
                value={this.state.lastName}
                fluid
                label="Last Name"
                type="text"
                name="lastName"
                iconPosition="left"
                placeholder="lastName"
              />
              <Form.Input
                value={this.state.email}
                fluid
                label="email"
                name="email"
                iconPosition="left"
                placeholder="email"
              />
              {/* <Form.Input
              fluid
              icon="heart"
              name="password"
              type="password"
              iconPosition="left"
              placeholder="new password"
              value={this.state.newPassword}
            /> */}
              <Form.Input
                value={this.state.pseudo}
                fluid
                name="pseudo"
                label="Pseudo"
                type="text"
                iconPosition="left"
                placeholder="pseudo"
              />
              <Form.Input
                value={this.state.age}
                fluid
                label="Age"
                type="number"
                name="age"
                iconPosition="left"
                placeholder="age"
              />
              <Form.Input>
                <TextArea
                  value={this.state.description}
                  fluid
                  label="Description"
                  name="description"
                  type="text"
                  iconPosition="left"
                  placeholder="description"
                />
              </Form.Input>
              <Form.Input
                fluid
                name="profilImage"
                iconPosition="left"
                placeholder="profilImage"
                type="file"
              />
              <Form.Input
                value={this.state.city}
                fluid
                label="City"
                name="city"
                iconPosition="left"
                placeholder="ville"
                type="text"
              />
              <Form.Input
                label="Address"
                id="input-address"
                value={this.state.address}
                onChange={this.handleChange}
                name="address"
                type="text"
              />
                <Form.Input
                  label="Zip code"
                  id="input-cp"
                  value={this.state.cp}
                  onChange={this.handleChange}
                  name="cp"
                  type="text"
                />


              <select name="gender">
                <option value="">Genre</option>
                <option value="male">homme</option>
                <option value="female">femme</option>
                <option value="other">autre</option>
              </select>
              <Button color="teal" fluid size="large">
                Editer cet utilisateur
              </Button>
            </Segment>
          </Form>
          <div className="admin-return-btn">
            <Link to="/Admin">
              <Button basic color="teal">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FormEditUser;
