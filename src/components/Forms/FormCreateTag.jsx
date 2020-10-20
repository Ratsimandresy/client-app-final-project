import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";


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

  render() {
    return (
      <div>
        <h1>CREATE A TAG</h1>
        <Form
          size="large"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="heart"
              name="label"
              iconPosition="left"
              placeholder="Nouveau Tag"
            />
            <Button color="teal" fluid size="large">
              Go pour ton nouveau tag
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default FormCreateTag;
