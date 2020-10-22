import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

import "../../styles/global.css";
import "../../styles/SignUp.css";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Radio,
} from "semantic-ui-react";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    gender: "male",
    errorMessage: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleChangeRadio = (event) => {
    if (event.target) {
      console.log(event.target.type);
      console.log(event.target.name);
      console.log(event.target.value);
      this.setState({
        gender: event.target.value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      gender,
      password,
      confirmPassword,
      email,
    } = this.state;

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    return (
      <>
        {" "}
        {/* 
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button>Submit</button>
        </form>
        */}
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 300 }}>
            <Header as="h2" color="teal" textAlign="center">
              Sign Up
            </Header>
            <Form
              size="large"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  type="text"
                  name="firstName"
                  placeholder="Yout first name"
                />
                <Form.Input
                  fluid
                  type="text"
                  name="lastName"
                  placeholder="Yout last name"
                />
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                />

                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                />

                <Form.Group inline>
                  {/* <label><p className="gender-label">Gender</p></label> */}
                  <div className="gender-checkbox-signup">
                    <span>
                      {this.state.gender === "male" ? (
                        <input
                          type="radio"
                          onChange={this.handleChangeRadio}
                          name="gender"
                          value="male"
                          checked
                        />
                      ) : (
                        <input
                          type="radio"
                          onChange={this.handleChangeRadio}
                          name="gender"
                          value="male"
                        />
                      )}{" "}
                      <p className="gender-label">Men</p>
                    </span>

                    <span>
                      <input
                        type="radio"
                        onChange={this.handleChangeRadio}
                        name="gender"
                        value="female"
                      />{" "}
                      <p className="gender-label">Women</p>{" "}
                    </span>
                    <span>
                      <input
                        type="radio"
                        onChange={this.handleChangeRadio}
                        name="gender"
                        value="other"
                      />{" "}
                      <p className="gender-label">Other</p>{" "}
                    </span>
                  </div>
                </Form.Group>
                {this.state.errorMessage && (
                  <p className="error-message">* {this.state.errorMessage}</p>
                )}
                <Button color="teal" fluid size="large">
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account ?<Link to="signin"> Sign In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default withRouter(FormSignup);
