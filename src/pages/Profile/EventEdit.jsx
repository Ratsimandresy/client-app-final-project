import React, {Component} from "react";
import {Form, Select, TextArea, Button} from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import AutoComplete from "../../components/utils/AutoComplete";

import {withRouter} from 'react-router-dom';
import {buildFormData} from '../../components/utils/buildFormData';

import "../../styles/FormEvent.css";

export default class EditEvent extends Component {
  state = {
      name: "",
      description: "",
      mainImageUrl: "",
      location: "",
      infos: "",
      city: "",
      categories: [],
      isLoading: true,
      listTags: [],
      tags: [],
      category: null,
      httpResponse: null,
      currentEvent: ""
  };

  async componentDidMount() {
    try {
        const currentEvent = await apiHandler.getOne("/api/event/", this.props.match.params.id);
        const categories = await apiHandler.getAll("/api/categories/");
        const tags = await apiHandler.getAll("/api/tags/");
        const {
            name,
            description,
            infos,
            city,
            category
        } = currentEvent;
        console.log(categories);
        console.log(tags);
        console.log(currentEvent);

        if (tags && categories) {
            this.setState({
                name,
                description,
                infos,
                currentEvent,
                city,
                categories,
                category,
                listTags: tags.tags,
                isLoading: false
            });
            console.log(this.state);
        }
    } catch (errApi) {
        this.setState({isLoading: false, error: errApi, errorMessage: errApi.message});
    }
  }

  handleChange = (event) => {
      const name = event.target.name;
      console.log(name);
      console.log(this.state);
      const value = event.target.type === "select" ? event.target.checked : event.target.type === "file" ? event.target.files[0] : event.target.value;

      this.setState({[name]: value});
  };

  handleChangeCheckbox = (event) => {
      const {name, value} = event.target;
      console.log(name);
      const newTags = [...this.state.tags];
      if (event.target.checked) {
          newTags.push(value);
          this.setState({tags: newTags});
          console.log(newTags);
      } else {
          newTags.splice(event.target.value, 1);
          this.setState({tags: newTags});
          console.log(newTags);
      }
  };

  handlePlace = (place) => {
      const location = place.geometry;
      location.formattedAddress = place.place_name;
      console.log("LOCATION HERE!!!!!!!!!", location);
      const splitAdress = place.place_name.split(",");
      // console.log(splitAdress);
      // console.log(splitAdress[1]);
      const splitCity = splitAdress[1].split(" ");
      // console.log(splitCity);
      const cp = splitCity[1];
      const city = splitCity[2];

      console.log("THIS IS THE PLACE", place);
      console.log(place.context[1].text);
      this.setState({location, city: place.context[1].text, cp});
  };

  handleCancel = (e) => {
      console.log(this.props);
      console.log(e.target);
      this.props.history.push("/profil");
  };

  handleSubmit = (event) => {
      event.preventDefault();
      const fd = new FormData();

      const {
          httpResponse,
          ...data
      } = this.state;

      console.log(data);
      buildFormData(fd, data);

      apiHandler.updateOne("/api/event/" + this.props.match.params.id, fd).then((apiRes) => {
          this.props.history.push("/profile");
      }).catch((err) => console.log(err));
  };

  render() {
      console.log(this.state.currentEvent);
      console.log(this.props.match.params.id);
      return (<div className="EventForm">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          {
          !this.state.isLoading && (<Form onSubmit={
                  this.handleSubmit
              }
              className="formContainer">

              <Form.Group>
                  <Form.Input value={
                          this.state.name
                      }
                      name="name"
                      onChange={
                          this.handleChange
                      }
                      label=" name"
                      placeholder="file event name"
                      width={5}/>

                  <Form.Input onChange={
                          this.handleChange
                      }
                      name="infos"
                      value={
                          this.state.infos
                      }
                      label="informations"
                      type="date"
                      placeholder="date format"
                      width={5}/>

                  <Form.Input onChange={
                          this.handleChange
                      }
                      name="city"
                      value={
                          this.state.city
                      }
                      label="city"
                      type="text"
                      placeholder="city"
                      width={4}/>
              </Form.Group>

              <select name="category" id="category"
                  onChange={
                      this.handleChange
              }> {
                  this.state.category ? (<option value={
                      this.state.category._id
                  }> {
                      this.state.category.label
                  }</option>) : (<option key={0}>
                      select a category
                  </option>)
              }
                  {
                  this.state.categories.map((category) => (<option key={
                          category._id
                      }
                      value={
                          category._id
                  }> {
                      category.label
                  } </option>))
              } </select>

              <Form.Group>
                  <label>Tags</label>
                  <div className="tags-list"> {
                      this.state.listTags.map((tag) => (<div key={
                          tag._id
                      }>
                          <input type="checkbox"
                              value={
                                  tag._id
                              }
                              onChange={
                                  this.handleChangeCheckbox
                              }
                              name="tags"/> {
                          tag.label
                      } </div>))
                  } </div>
              </Form.Group>

              <Form.Group>
                  <Form.Input name="mainImageUrl"
                      onChange={
                          this.handleChange
                      }
                      label="Picture"
                      type="file"
                      width={8}/>
              </Form.Group>
              <Form.Group>
                  <TextArea value={
                          this.state.description
                      }
                      name="description"
                      onChange={
                          this.handleChange
                      }
                      placeholder="Describe your post/event"
                      style={
                          {
                              minHeight: 90,
                              width: 600
                          }
                      }/>
              </Form.Group>

              <div className="form-group">
                  <label className="label" htmlFor="location">
                      Address
                  </label>
                  <AutoComplete onSelect={
                      this.handlePlace
                  }/>
              </div>

              <Button.Group>
                  <Button onClick={
                      this.handleCancel
                  }>Cancel</Button>
                  <Button.Or/>
                  <Button color="teal">Update event</Button>
              </Button.Group>
          </Form>)
      } </div>);
    }
}
