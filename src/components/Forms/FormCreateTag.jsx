import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Segment, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import "../../styles/admin.css";

class FormCreateTag extends Component {
  state = {
    label: null,
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

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .createOne("/api/admin/tags", this.state)
      .then((apiResLabel) => {
        this.props.history.push("/Admin");
        console.log(apiResLabel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleReturn = () => {
    console.log("retour");
  };

  render() {
    return (
      <div className="admin-forms-main-container">
        <div className="admin-forms-h1">
          <h2>Create a new tag</h2>
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
                name="label"
                iconPosition="left"
                placeholder="New Tag"
              />
              <Button color="teal" fluid size="large">
                Create a new one!
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

export default FormCreateTag;
