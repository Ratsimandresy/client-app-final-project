import React, { Component } from "react";
import API from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { withRouter, Link } from "react-router-dom";
import AutoComplete from "../utils/AutoComplete";
import { buildFormData } from "../utils/buildFormData";
import "../../styles/profileEdit.css";

import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Message,
  TextArea,
  Segment,
} from "semantic-ui-react";

class FormEditProfile extends React.Component {
  state = {
    user: null,
    isLoading: true,
    errorMessage: null,
    firstName: null,
    lastName: null,
    newPassword: null,
    gender: null,
    profilImage: null,
    age: null,
    pseudo: null,
    address: null,
    cp: null,
    city: null,
    formattedAdress: null,
  };

  async componentDidMount() {
    try {
      const loadedUser = await API.getMe("/api/user/me");
      console.log(loadedUser);
      delete loadedUser.userEvents;
      for (const key in loadedUser.currentUser) {
        if (loadedUser.currentUser.hasOwnProperty(key)) {
          const element = loadedUser.currentUser[key];
          console.log(key);
          this.setState({ [key]: element });
        }
      }
      this.setState({
        // user: loadedUser,
        isLoading: false,
      });
      console.log(this.state);
    } catch (errApi) {
      console.log(errApi);
      this.setState({ errorMessage: errApi, isLoading: false });
    }
  }

  handleChange = (event) => {
    const key = event.target.name;
    console.log("handleChange");
    console.log(event.target);
    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // const formattedAddress = `${address}, ${cp}, ${city}`;
    // console.log(age);
    const fd = new FormData();

    const { httpResponse, ...data } = this.state;

    buildFormData(fd, data);
    try {
      const updatedUser = await API.updateOne("api/user/update", fd);
      console.log(updatedUser);
      this.props.history.push("/profile");
    } catch (errApi) {
      console.log(errApi);
    }
  };

  render() {
    return (
      // <div className="form form-edit-profile profile-edit-main-container">
      <div className="profile-edit-main-container">
        <div className="profile-forms-h1">
          <h1>Edit my profile</h1>
        </div>{" "}
        <div>
        {!this.state.isLoading && (
          <div className="profile-edit-container">
            {/* <Card> */}
            <Form onSubmit={this.handleSubmit}>
              {/* <div className="form-group"> */}
              <div className="profile-edit-img-wrap">
                {this.state.profilImage ? (
                  <>
                    <img src={this.state.profilImage} alt="profilepicture" />
                    <Form.Input
                      label="Image"
                      name="profilImage"
                      iconPosition="left"
                      placeholder="profilImage"
                      type="file"
                      onChange={this.handleChange}
                    />
                  </>
                ) : (
                  <Form.Input
                    label="Image"
                    name="profilImage"
                    iconPosition="left"
                    placeholder="profilImage"
                    type="file"
                    onChange={this.handleChange}
                  />
                )}
              </div>
              {/* </div> */}
              <Form.Group>
                <Form.Input
                  label="First name"
                  value={this.state.firstName}
                  fluid
                  id="input-firstName"
                  onChange={this.handleChange}
                  name="firstName"
                  type="text"
                  width={8}
                />

                <Form.Input
                  label="Last name"
                  id="input-lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  width={8}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  label="Pseudo"
                  id="input-pseudo"
                  value={this.state.pseudo}
                  onChange={this.handleChange}
                  name="pseudo"
                  type="text"
                  width={8}
                />

                <Form.Input
                  label="Age"
                  id="input-age"
                  value={this.state.age}
                  onChange={this.handleChange}
                  name="age"
                  type="number"
                  width={8}
                />
              </Form.Group>
              <Form.Input label="Description">
                <TextArea
                  id="input-description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  name="description"
                  type="text"
                />
              </Form.Input>
              <Form.Group>
                <Form.Input
                  label="Email"
                  id="input-email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                  type="text"
                  width={8}
                />

                <Form.Input
                  label="New password"
                  id="input-password"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  name="newPassword"
                  type="password"
                  width={8}
                />
              </Form.Group>

              <div className="form-group">
                <p id="gender">Gender</p>
                <label htmlFor="input-men">
                  {" "}
                  {this.state.gender === "male" ? (
                    <input
                      id="input-men"
                      onChange={this.handleChange}
                      name="gender"
                      value="male"
                      type="radio"
                      checked
                    />
                  ) : (
                    <input
                      id="input-men"
                      onChange={this.handleChange}
                      name="gender"
                      value="male"
                      type="radio"
                    />
                  )}
                  &nbsp; Men
                </label>

                <label htmlFor="input-women">
                  {" "}
                  {this.state.gender === "female" ? (
                    <input
                      id="input-women"
                      onChange={this.handleChange}
                      name="gender"
                      value="female"
                      type="radio"
                      checked
                    />
                  ) : (
                    <input
                      id="input-women"
                      name="gender"
                      onChange={this.handleChange}
                      value="female"
                      type="radio"
                    />
                  )}
                  &nbsp; Women
                </label>

                <label htmlFor="input-other">
                  {" "}
                  {this.state.gender === "other" ? (
                    <input
                      id="input-other"
                      onChange={this.handleChange}
                      name="gender"
                      value="other"
                      type="radio"
                      checked
                    />
                  ) : (
                    <input
                      id="input-other"
                      onChange={this.handleChange}
                      name="gender"
                      value="other"
                      type="radio"
                    />
                  )}
                  &nbsp; Other
                </label>
              </div>
              <Form.Input
                label="Address"
                id="input-address"
                value={this.state.address}
                onChange={this.handleChange}
                name="address"
                type="text"
              />
              <Form.Group>
                <Form.Input
                  label="Zip code"
                  id="input-cp"
                  value={this.state.cp}
                  onChange={this.handleChange}
                  name="cp"
                  type="text"
                  width={8}
                />

                <Form.Input
                  label="City"
                  id="input-city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  name="city"
                  type="text"
                  width={8}
                />
              </Form.Group>
              <Button color="teal">Update</Button>
            </Form>
            {/* </Card> */}
          </div>
        )}{" "}
        <div className="admin-return-btn">
          <Link to="/profile">
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

export default withRouter(withUser(FormEditProfile));
