import React, { Component } from "react";
import { Form, Segment, TextArea, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";

class FormCreateUser extends Component {
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

    apiHandler
      .createOne("/api/admin/users", this.state)
      .then((apiRes) => {
        console.log(apiRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>CREER UN USER</h1>
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
            />
            <Form.Input
              fluid
              icon="heart"
              name="address"
              type="text"
              iconPosition="left"
              placeholder="address"
            />
            <Form.Input
              fluid
              icon="heart"
              name="city"
              iconPosition="left"
              placeholder="city"
            />
            <Form.Input
              fluid
              icon="heart"
              name="cp"
              iconPosition="left"
              placeholder="cp"
            />
            <select name="gender">
              <option value="">Genre</option>
              <option value="male">homme</option>
              <option value="female">femme</option>
              <option value="other">autre</option>
            </select>
            <Button color="teal" fluid size="large">
              Et hop! Un nouvel utilisateur
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default FormCreateUser;
