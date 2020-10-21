import React, { Component } from "react";
import {
  Form,
  Select,
  Checkbox,
  Segment,
  TextArea,
  Button,
} from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import AutoComplete from "../utils/AutoComplete";
import { buildFormData } from "../utils/buildFormData";


class AdminFormEditEvent extends Component {
  state = {
    listTags: [],
    listCategories: [],
    name: null,
    description: null,
    // tags: [],
    // category: [],
    city: null,
  };

  async componentDidMount() {
    try {
      const tags = await apiHandler.getAll("/api/tags");
      const categories = await apiHandler.getAll("/api/categories");
      const currentEvent = await apiHandler.getOne(
        "/api/admin/events/",
        this.props.match.params.id
      );
      if (tags && categories && currentEvent) {
        console.log(tags);

        this.setState({
          listTags: tags.tags,
          listCategories: categories,
          name: currentEvent.name,
          description: currentEvent.description,
          city: currentEvent.city,
        });
        console.log(this.state);
      }
    } catch (errApi) {
      console.log(errApi);
    }
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
    console.log(this.state);

    const fd = new FormData();

    const { httpResponse, ...data } = this.state;

    buildFormData(fd, data);
    
    // for (let key in this.state) {
    //   fd.append(key, this.state[key]);
    // }

    apiHandler
      .updateOne("/api/admin/events/" + this.props.match.params.id, fd)
      .then((apiRes) => {
        // this.props.history.push("/Admin");
        console.log(apiRes);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>FORM EDIT EVENT</h1>
        <Form
          size="large"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <Segment stacked>
            <Form.Input
              value={this.state.name}
              fluid
              icon="heart"
              name="name"
              type="text"
              iconPosition="left"
              placeholder="name of your event"
            />
            <Form.Input>
              <select>
                <option value="">Choisis ta catégorie</option>
                {this.state.listCategories.map((category) => (
                  <option value={category.label}>{category.label}</option>
                ))}
              </select>
            </Form.Input>
            <Form.Input>
              {this.state.listTags.map((tag) => (
                <Checkbox label={tag.label} />
              ))}
            </Form.Input>
            <Form.Input
              name="time"
              label="time"
              type="datetime-local"
              placeholder="hour format"
            />
            <Form.Input
              value={this.state.city}
              fluid
              type="text"
              icon="heart"
              name="city"
              iconPosition="left"
              placeholder="ville"
            />
            <Form.Input>
              <TextArea
                value={this.state.description}
                fluid
                icon="heart"
                name="description"
                type="text"
                iconPosition="left"
                placeholder="description"
              />
            </Form.Input>
            <Form.Input>
              <AutoComplete onSelect={this.handlePlace} />
            </Form.Input>
            <Button color="teal" fluid size="large">
              Editer cet événement
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default AdminFormEditEvent;
