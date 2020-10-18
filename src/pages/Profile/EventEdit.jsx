// import React, { Component } from "react";
// import { Form, Select, TextArea, Button } from "semantic-ui-react";
// import apiHandler from "../../api/apiHandler";
// import "../../styles/FormEvent.css";

// const defaultOptions = [
//   { key: "sp", value: "sp", text: "sport" },
//   { key: "mu", value: "mu", text: "music" },
//   { key: "np", value: "np", text: "nice place" },
//   { key: "pl", value: "pl", text: "plan" },
// ];

// class EventEdit extends Component {
//   state = {
//     name: "",
//     description: "",
//     city: "",
//     location: "",
//     infos: "",
//   };

//   componentDidMount() {
//     console.log("this is the props ===>>>>");
//     apiHandler
//       .getOne("/api/event/" + this.props.match.params.id)
//       .then((apiRes) => {
//         console.log("<================>", apiRes.data);
//         const { name, infos, description, city } = apiRes.data;
//         this.setState({ name, infos, description, city });
//       })
//       .catch((err) => console.log(err));
//   }

//   handleChange = (event) => {
//     const key = event.target.name;
//     const value =
//       event.target.type === "file"
//         ? event.target.files[0]
//         : event.target.type === "checkbox"
//         ? event.target.checked
//         : event.target.value;

//     this.setState({ [key]: value });
//   };

//   isValidInput = (key) => {
//     if (this.state[key] === "") {
//       return false;
//     } else return true;
//   };

//   handleCancel = () => {
//     this.props.history.push("/profile");
//     this.setState({ event: this.state.event });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("submittinggggsg");
//     console.log(this.props);
//     const fd = new FormData();

//     for (const key in this.state) {
//       fd.append(key, this.state[key]);
//     }
//     console.log(fd);
//     apiHandler
//       .updateOne("/api/event/" + this.props.match.params.id, fd)
//       .then((apiRes) => {
//         console.log("apires ====>>>>>>", apiRes);
//         this.setState(apiRes);
//         this.props.history.push("/profile");
//       })
//       .catch((err) => console.log("error", err));
//   };

//   render() {
//     return (
//       <div className="EventForm">
//         <pre>{JSON.stringify(this.state, null, 2)}</pre>
//         <Form onSubmit={this.handleSubmit} className="formContainer">
//           <Form.Group>
//             <Form.Input
//               value={this.state.name}
//               id="name"
//               label="name"
//               name="name"
//               autoComplete="off"
//               onChange={this.handleChange}
//               placeholder={"fill event name"}
//               width={5}
//             />

//             <Form.Input
//               value={this.state.infos}
//               onChange={this.handleChange}
//               name="infos"
//               label="infos"
//               autoComplete="off"
//               placeholder="date format"
//               width={5}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Select
//               // value={this.state.category}
//               onChange={this.handleChange}
//               name="category"
//               label="category"
//               placeholder="category"
//               autoComplete="off"
//               width={6}
//               options={defaultOptions}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Input
//               value={this.state.location}
//               name="location"
//               onChange={this.handleChange}
//               autoComplete="off"
//               label="location"
//               placeholder="2 Wide"
//               width={7}
//             />
//             <Form.Input
//               value={this.state.city}
//               name="city"
//               onChange={this.handleChange}
//               label="city"
//               autoComplete="off"
//               placeholder="city"
//               width={7}
//             />
//           </Form.Group>
//           {/* <Form.Group>
//             <Select
//               // value={this.state.tag}
//               name="tag"
//               placeholder="tag"
//               onChange={this.handleChange}
//               autoComplete="off"
//               width={6}
//               options={defaultOptions}
//             />
//           </Form.Group> */}
//           {/* <Form.Group>
//             <Form.Input
//               // value={this.state.mainImageUrl}
//               name="mainImageUrl"
//               onChange={this.handleChange}
//               autoComplete="off"
//               label="Picture"
//               type="file"
//               width={8}
//             />
//           </Form.Group> */}
//           <Form.Group>
//             <TextArea
//               value={this.state.description}
//               name="description"
//               onChange={this.handleChange}
//               placeholder="Describe your post/event"
//               autoComplete="off"
//               style={{ minHeight: 90, width: 600 }}
//             />
//           </Form.Group>
//           <Button.Group>
//             <Button onClick={this.handleCancel}>Cancel</Button>
//             <Button.Or />
//             <Button color="teal">Update</Button>
//           </Button.Group>
//         </Form>
//       </div>
//     );
//   }
// }

// export default EventEdit;

//=====================================================================//

import React, { Component } from "react";
import { Form, Select, TextArea, Button } from "semantic-ui-react";
import apiHandler from "../../api/apiHandler";
import AutoComplete from "../../components/utils/AutoComplete";
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
    category: "",
    currentEvent: "",
  };

  async componentDidMount() {
    try {
      const currentEvent = await apiHandler.getOne(
        "/api/event/",
        this.props.match.params.id
      );
      const categories = await apiHandler.getAll("/api/categories/");
      const tags = await apiHandler.getAll("/api/tags/");
      const { name, description, infos } = currentEvent;
      console.log(categories);
      console.log(tags);

      if (tags) {
        this.setState({
          name,
          description,
          infos,
          currentEvent,
          categories,
          listTags: tags.tags,
          isLoading: false,
        });
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
    console.log(name);
    console.log(this.state);
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
      this.setState({
        tags: newTags,
      });
      console.log(newTags);
    } else {
      newTags.splice(event.target.value, 1);
      this.setState({
        tags: newTags,
      });
      console.log(newTags);
    }
  };

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;

    const splitAdress = place.place_name.split(",");
    console.log(splitAdress);
    console.log(splitAdress[1]);
    const splitCity = splitAdress[1].split(" ");
    console.log(splitCity);
    const cp = splitCity[1];
    const city = splitCity[2];

    console.log(place);
    this.setState({ location, city, cp });
  };

  handleCancel = (e) => {
    console.log(this.props);
    console.log(e.target);
    this.props.history.push("/profil");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submittinggggg");

    const fd = new FormData();

    for (const key in this.state) {
      if (key === "tags") {
        fd.append("tags", JSON.stringify(this.state.tags));
      } else {
        fd.append(key, this.state[key]);
      }
      console.log("-------key form-----", key, this.state[key]);
    }

    apiHandler
      .updateOne("/api/event/", fd)
      .then((apiRes) => {
        this.props.history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.currentEvent);
    return (
      <div className="EventForm">
        {!this.state.isLoading && (
          <Form onSubmit={this.handleSubmit} className="formContainer">
            <Form.Group>
              <Form.Input
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                label=" name"
                placeholder="file event name"
                width={5}
              />

              <Form.Input
                onChange={this.handleChange}
                name="infos"
                value={this.state.infos}
                label="informations"
                type="date"
                placeholder="date format"
                width={5}
              />
            </Form.Group>

            <select name="category" id="category" onChange={this.handleChange}>
              <option key={0} value="-1" disabled>
                select a category
              </option>
              {this.state.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.label}
                </option>
              ))}
            </select>

            <Form.Group>
              <label>Tags</label>
              <div className="tags-list">
                {this.state.listTags.map((tag) => (
                  <div key={tag._id}>
                    <input
                      type="checkbox"
                      value={tag._id}
                      onChange={this.handleChangeCheckbox}
                      name="tags"
                    />
                    {tag.label}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Input
                name="mainImageUrl"
                onChange={this.handleChange}
                label="Picture"
                type="file"
                width={8}
              />
            </Form.Group>
            <Form.Group>
              <TextArea
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
                placeholder="Describe your post/event"
                style={{
                  minHeight: 90,
                  width: 600,
                }}
              />
            </Form.Group>

            <div className="form-group">
              <label className="label" htmlFor="location">
                Address
              </label>
              <AutoComplete onSelect={this.handlePlace} />
            </div>

            <Button.Group>
              <Button onClick={this.handleCancel}>Cancel</Button>
              <Button.Or />
              <Button color="teal">Add new event</Button>
            </Button.Group>
          </Form>
        )}
      </div>
    );
  }
}
