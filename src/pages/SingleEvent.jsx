import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";
import { Image, Label, Icon } from "semantic-ui-react";
import "../styles/singleUser.css";
import { Link } from "react-router-dom";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class SingleUser extends React.Component {
  state = {
    event: null,
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  componentDidMount() {
    console.log(this.props.match.params.eventId);
    apiHandler
      .getOne("/api/event/", this.props.match.params.eventId)
      .then((apiRes) => {
        console.log("------------------", apiRes);
        this.setState({ event: apiRes });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.event) {
      return <div>Loading the event...</div>;
    }

    return (
      <div id="main-global-singleuser">
        <div id="singleUser-main">
          <div className="singleUser-container">
            <div>
              <h1>EVENT</h1>
              <h2>{this.state.event.name}</h2>
              <br />
              <p>
                Un événement créé par : <br />{" "}
                <Link to={`/all-users/${this.state.event.userId._id}`}>
                  <span>
                    {this.state.event.userId.firstName}{" "}
                    {this.state.event.userId.lastName}
                  </span>
                </Link>
              </p>
              <Label className="event-tag" size='tiny' color='orange'>
                                {this.state.event.category.label}
                            </Label>
              <br />
              {this.state.event.tags.map(tag => (
                <Label color='teal' className="event-tag singleuser-tags" size="tiny" key={tag._id} tag>
                  {tag.label}
                </Label>
              ))}
            </div>
            <Image
              src={this.state.event.mainImageUrl}
              size="medium"
              rounded
              alt="profil picture"
              width="100px"
            />
          </div>
          <p>
            <div className="description-singleUser">
              <i>
                A propos <br /> <span>{this.state.event.description}</span>
              </i>
            </div>
          </p>
          <div className="map-container-single-event">
            <Map
              style="mapbox://styles/mapbox/light-v10"
              zoom={[12]}
              containerStyle={{
                // top: 0,
                // left: 0,
                // bottom: 0,
                // right: 0,
                // position: "absolute",
                height: 300 + "px",
              }}
              center={[this.state.lng, this.state.lat]}
            ></Map>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleUser;
