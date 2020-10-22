import React, { Component } from "react";
import { Form, Select, TextArea, Button } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { buildFormData } from "../utils/buildFormData";

import apiHandler from "../../api/apiHandler";
import AutoComplete from "../utils/AutoComplete";
import "../../styles/FormEvent.css";

class FormEvent extends Component {
  state = {
    name: null,
    description: null,
    mainImageUrl: null,
    location: null,
    infos: null,
    time: null,
    city: null,
    categories: [],
    isLoading: true,
    listTags: [],
    tags: [],
    category: null,
    httpResponse: null,
    formIsValid: false,
  };

  async componentDidMount() {
    try {
      const categories = await apiHandler.getAll("/api/categories/");
      const tags = await apiHandler.getAll("/api/tags/");
      console.log(categories);
      console.log(tags);
      if (tags && categories) {
        this.setState({ categories, listTags: tags.tags, isLoading: false });
      }
    } catch (errApi) {
      this.setState({
        isLoading: false,
        error: errApi,
        errorMessage: errApi.message,
      });
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "select"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    this.setState({ [name]: value });
  };

  handleChangeCheckbox = (event) => {
    const { name, value } = event.target;
    console.log(name);
    const newTags = [...this.state.tags];
    if (event.target.checked) {
      newTags.push(value);
      this.setState({ tags: newTags });
    } else {
      newTags.splice(event.target.value, 1);
      this.setState({ tags: newTags });
    }
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

  //   handleCancel = (e) => {
  //     this.props.history.push("/profil");
  //   };

  //   handleSubmit = (event) => {
  //     event.preventDefault();
  //     console.log(this.state.location);

  //     const newData = new Object();

  //     const fd = new FormData();
  //     const { httpResponse, ...data } = this.state;
  //     console.log(data);
  //     console.log(buildFormData(fd, data));

  //     for (const [key, value] of Object.entries(fd)) {
  //       console.log(`${key}: ${value}`);
  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "select"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files[0]
        : event.target.value;

    this.setState({ [name]: value });
  };

  handleChangeCheckbox = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    const newTags = [...this.state.tags];
    if (event.target.checked) {
      newTags.push(value);
      this.setState({ tags: newTags });
    } else {
      newTags.splice(event.target.value, 1);
      this.setState({ tags: newTags });
    }
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

  handleCancel = (e) => {
    this.props.history.push("/profil");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.location);

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    console.log(data);
    console.log(buildFormData(fd, data));

    for (const [key, value] of Object.entries(fd)) {
      console.log(`${key}: ${value}`);
    }

    apiHandler
      .createOne("/api/event/", fd)
      .then((apiRes) => {
        this.props.history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="EventForm">
        <div className="admin-forms-h1">
          <h1>Create a new event</h1>
        </div>{" "}
        <div id="test">
        {!this.state.isLoading && (
          <Form onSubmit={this.handleSubmit} className="formContainer">
            <Form.Input
              name="name"
              onChange={this.handleChange}
              required
              label="Title"
              placeholder="event's name"
            />

            <Form.Input
              name="mainImageUrl"
              onChange={this.handleChange}
              required
              label="Picture"
              type="file"
            />

            <Form.Input
              onChange={this.handleChange}
              name="time"
              label="date and time"
              type="datetime-local"
              placeholder="hour"
              required
            />

            <label>Categories</label>
            <select
              name="category"
              id="category"
              onChange={this.handleChange}
              required
            >
              <option key={0}>select a category</option>
              {this.state.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {" "}
                  {category.label}{" "}
                </option>
              ))}{" "}
            </select>
            <br />
            <label>Tags</label>
            <div className="tags-list">
              {this.state.listTags.map((tag) => (
                <div key={tag._id}>
                  <input
                    type="checkbox"
                    value={tag._id}
                    onChange={this.handleChangeCheckbox}
                    name="tags"
                  />{" "}
                  {tag.label}{" "}
                </div>
              ))}
            </div>
            <br />
            <Form.Input label="Description">
              <TextArea
                name="description"
                onChange={this.handleChange}
                required
                placeholder="Describe your post/event"
                // style={{
                //   minHeight: 90,
                //   width: 600,
                // }}
              />
            </Form.Input>
            {/* <div className="form-group"> */}
            <Form.Input label="Address">
              <AutoComplete required onSelect={this.handlePlace} />
            </Form.Input>
            {/* </div> */}

            <Button color="teal">Add new event</Button>
          </Form>
        )}
        <div className="profile-editevent-back-btn">
          <Link to="/all-events">
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

//     if (this.state.formIsValid) {}
//       apiHandler
//         .createOne("/api/event/", fd)
//         .then((apiRes) => {
//           this.props.history.push("/profile");
//         })
//         .catch((err) => console.log(err));

//   };

//   render() {
//     return (
//       <div className="EventForm">
//         {" "}
//         {!this.state.isLoading && (
//           <Form onSubmit={this.handleSubmit} className="formContainer">
//             <Form.Group>
//               <Form.Input
//                 name="name"
//                 onChange={this.handleChange}
//                 required
//                 label=" name"
//                 placeholder="file event name"
//                 width={5}
//               />

//               <Form.Input
//                 onChange={this.handleChange}
//                 name="infos"
//                 label="informations"
//                 type="date"
//                 placeholder="date format"
//                 width={5}
//               />
//             </Form.Group>

//             <select
//               name="category"
//               id="category"
//               onChange={this.handleChange}
//               required
//             >
//               <option key={0}>select a category</option>
//               {this.state.categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {" "}
//                   {category.label}{" "}
//                 </option>
//               ))}{" "}
//             </select>

//             <Form.Group>
//               <label>Tags</label>
//               <div className="tags-list">
//                 {this.state.listTags.map((tag) => (
//                   <div key={tag._id}>
//                     <input
//                       type="checkbox"
//                       value={tag._id}
//                       onChange={this.handleChangeCheckbox}
//                       name="tags"
//                     />{" "}
//                     {tag.label}{" "}
//                   </div>
//                 ))}
//               </div>
//             </Form.Group>

//             <Form.Group>
//               <Form.Input
//                 name="mainImageUrl"
//                 onChange={this.handleChange}
//                 required
//                 label="Picture"
//                 type="file"
//                 width={8}
//               />
//             </Form.Group>
//             <Form.Group>
//               <TextArea
//                 name="description"
//                 onChange={this.handleChange}
//                 required
//                 placeholder="Describe your post/event"
//                 style={{
//                   minHeight: 90,
//                   width: 600,
//                 }}
//               />
//             </Form.Group>

//             <div className="form-group">
//               <label className="label" htmlFor="location">
//                 Address
//               </label>
//               <AutoComplete required onSelect={this.handlePlace} />
//             </div>

//             <Button.Group>
//               <Button onClick={this.handleCancel}>Cancel</Button>
//               <Button.Or />
//               <Button color="teal">Add new event</Button>
//             </Button.Group>
//           </Form>
//         )}{" "}
//       </div>
//     );
//   }
// }

export default withRouter(FormEvent);
