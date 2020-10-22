import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "../../styles/admin.css";

class FormEditCategory extends Component {
  state = {
    label: null,
    categories: null,
  };

  componentDidMount() {
    console.log(this.props);

    apiHandler
      .getOne("/api/admin/category/", this.props.match.params.id)
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
        "/api/admin/categories/" + this.props.match.params.id,
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
      <div className="admin-forms-main-container">
        <div className="admin-forms-h1">
          <h1>Edit a category</h1>
        </div>
        <div className="admin-forms-form">
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                value={this.state.label}
                fluid
                name="label"
                iconPosition="left"
                onChange={this.handleChange}
              />
              <Button color="teal" fluid size="large">
                Edit your category
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

export default FormEditCategory;
