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
import { Link } from "react-router-dom";
import "../../styles/admin.css";

class AdminFormEditEvent extends Component {
  state = {
    listTags: [],
    listCategories: [],
    mainImageUrl: null,
    name: null,
    description: null,
    tags: [],
    category: [],
    city: null,
    time: null,
    location: null,
    btnToggle: false,
    tagsDisabled: true,
    toggleDisabled: false,
    formattedAddress: null,
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
          mainImageUrl: currentEvent.mainImageUrl,
          description: currentEvent.description,
          city: currentEvent.city,
          tags: currentEvent.tags,
          formattedAddress: currentEvent.formattedAddress,
          location: currentEvent.location,
          category: currentEvent.category,
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

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;

    const splitAdress = place.place_name.split(",");

    const splitCity = splitAdress[1].split(" ");
    const cp = splitCity[1];
    const city = splitCity[2];

    console.log(place);
    this.setState({ location, city, cp });
  };

  handlerToggle = () => {
    if (this.state.btnToggle) {
      console.log("nop");
    } else {
      console.log("yep");
      console.log(this.state.tags);
      let emptyTags = [...this.state.tags];
      emptyTags = [];

      this.setState({ tags: emptyTags, tagsDisabled: false }, () => {
        console.log(this.state.tags);
      });
      console.log(this.state.tags);
    }
    const toggle = !this.state.btnToggle;

    this.setState({ btnToggle: toggle });
  };

  handleChangeCheckbox = (event) => {
    const { name, value } = event.target;
    console.log(value);
    let newTags = [...this.state.tags];
    console.log(newTags);
    if (event.target.checked) {
      newTags.push(value);
      this.setState({ tags: newTags });
    } else {
      newTags.splice(event.target.value, 1);
      this.setState({ tags: newTags });
    }
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

    for (const [key, value] of Object.entries(fd)) {
      console.log(`${key}: ${value}`);
    }

    apiHandler
      .updateOne("/api/admin/events/" + this.props.match.params.id, fd)
      .then((apiRes) => {
        this.props.history.push("/Admin");
        console.log(apiRes);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="admin-forms-main-container">
        <div className="admin-forms-h1">
          <h1>Edit a event</h1>
        </div>
        <div className="admin-forms-form">
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                value={this.state.name}
                fluid
                icon="heart"
                name="name"
                type="text"
                iconPosition="left"
                placeholder="name of your event"
                onChange={this.handleChange}
              />
              <Form.Input>
                <select name="category" onChange={this.handleChange}>
                  <option value="">select a category</option>
                  {this.state.listCategories.map((category) => (
                    <option value={category._id}>{category.label}</option>
                  ))}
                </select>
              </Form.Input>
              <Form.Input>
                <p> select new tags : &#160;</p>
                <Checkbox
                  toggle
                  checked={this.state.btnToggle}
                  onClick={this.handlerToggle}
                  disabled={this.state.toggleDisabled}
                />
              </Form.Input>
              <Form.Input>
                <div id="admin-edit-tags-checkbox">
                  {this.state.listTags.map((tag) => (
                    <div key={tag._id}>
                      <input
                        disabled={this.state.tagsDisabled}
                        label={tag.label}
                        type="checkbox"
                        value={tag._id}
                        onChange={this.handleChangeCheckbox}
                        name="tags"
                      />{" "}
                      &#160;
                      {tag.label}{" "}
                    </div>
                  ))}
                </div>
              </Form.Input>
              <Form.Input
                name="time"
                type="datetime-local"
                placeholder="hour"
                onChange={this.handleChange}
              />
              <Form.Input
                icon="heart"
                name="mainImageUrl"
                iconPosition="left"
                type="file"
                placeholder="mainImageUrl"
                onChange={this.handleChange}
              />
              <Form.Input
                value={this.state.city}
                fluid
                type="text"
                icon="heart"
                name="city"
                iconPosition="left"
                placeholder="city"
                onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
              </Form.Input>
              <Form.Input>
                <AutoComplete onSelect={this.handlePlace} />
              </Form.Input>
              <Button color="teal" fluid size="large">
                Edit this event
              </Button>
            </Segment>
          </Form>
          <div className="admin-return-btn">
            <Link to="/Admin">
              <Button basic color="teal">
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminFormEditEvent;
