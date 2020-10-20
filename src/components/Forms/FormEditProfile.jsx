import React, { Component } from "react";
import API from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router-dom";
import AutoComplete from "../utils/AutoComplete";

import { buildFormData } from "../utils/buildFormData";

import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Message,
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
    } catch (errApi) {
      console.log(errApi);
    }
  };

  render() {
    return (
      <div className="form form-edit-profile">
        {" "}
        {!this.state.isLoading && (
          <div className="container">
            <Card>
              <form
                className="form form-edit-profile"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="input-profileImage">Profil Picture</label>
                  {this.state.profilImage ? (
                    <>
                      <img src={this.state.profilImage} alt="" />
                      <input
                        id="input-profileImage"
                        name="profilImage"
                        onChange={this.handleChange}
                        type="file"
                      />
                    </>
                  ) : (
                    <input
                      id="input-profileImage"
                      name="profilImage"
                      onChange={this.handleChange}
                      type="file"
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="input-firstName">First Name</label>
                  <input
                    id="input-firstName"
                    name="firstName"
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-lastName">Last Name</label>
                  <input
                    id="input-lastName"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-pseudo">Pseudo</label>
                  <input
                    id="input-pseudo"
                    name="pseudo"
                    value={this.state.pseudo}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-description">Description</label>
                  <textarea
                    onChange={this.handleChange}
                    id="input-description"
                    row="5"
                    name="description"
                  >
                    {this.state.description}
                  </textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="input-email">Email</label>
                  <input
                    id="input-email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-password">New Password</label>
                  <input
                    id="input-password"
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    type="password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-age">Age</label>
                  <input
                    id="input-age"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    type="number"
                  />
                </div>

                <div className="form-group">
                  <span>Gender:</span>
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
                    Men
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
                    Women
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
                    Other
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="input-address">Address</label>
                  <input
                    id="input-address"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-cp">Code Postal</label>
                  <input
                    id="input-cp"
                    name="cp"
                    value={this.state.cp}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="input-city">City</label>
                  <input
                    id="input-city"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    type="text"
                  />
                </div>

                <Button fluid>Update</Button>
              </form>
            </Card>
          </div>
        )}{" "}
      </div>
    );
  }
}

export default withRouter(withUser(FormEditProfile));
