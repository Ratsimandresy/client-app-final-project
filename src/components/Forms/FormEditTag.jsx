import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";


class FormEditTag extends Component {
  state = {
    label: null,
    tags: null,
  };

  componentDidMount() {
    console.log(this.props);

    apiHandler
      .getOne("/api/admin/tags/", this.props.match.params.id)
      .then((apiRes) => {
        this.setState({ label: apiRes.label });
        console.log(this.state);
      });
  }

  handleChange = (event) => {
    console.log(event.target.value);
    const key = event.target.name;

    this.setState({ [key]: event.target.value });
    console.log(this.state);
  };


  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .updateOne(
        "/api/admin/tags/" + this.props.match.params.id,
        this.state
      )
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
        <h1>Edit a Tag</h1>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input
              value={this.state.label}
              fluid
              icon="heart"
              name="label"
              iconPosition="left"
              placeholder="Modifier la catégorie"
              onChange={this.handleChange}
            />
            <Button color="teal" fluid size="large">
              Go pour modifier ton tag
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default FormEditTag;
