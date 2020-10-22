import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";
import { Image, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CommentGroup from "../components/Comment/CommentGroup";
import moment from "moment";
import "../styles/SingleEvent.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

let frDate;

class SingleUser extends React.Component {
  state = {
    event: null,
    isLoading: true,
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12, // used for map zoom level
  };

  async componentDidMount() {
    console.log(this.props.match.params.eventId);
    try {
      const currentEvent = await apiHandler.getOne(
        "api/event/",
        this.props.match.params.eventId
      );
      console.log("cuurentevent : ", currentEvent);
      if (currentEvent) {
        this.setState(
          {
            isLoading: false,
            event: currentEvent,

            lng: currentEvent.location.coordinates[0],
            lat: currentEvent.location.coordinates[1],
          },
          () => {
            console.log(this.state);
          }
        );
      }
    } catch (errApi) {
      console.log(errApi);
    }
  }

  render() {
    if (!this.state.event) {
      return <div>Loading the event...</div>;
    }
    console.log(this.props);

    return (
      <div className="main-global-singleevent">
        <pre>{JSON.stringify(this.props.match, null, 2)}</pre>
        <div className="singleEvent-main">
          <div className="singleEvent-container">
            <div className="single-event-infos">
              <h2>{this.state.event.name}</h2>
              <br />
              <p className="single-event-name">
                <Icon name="user circle" /> <br />{" "}
                <Link to={`/all-users/${this.state.event.userId._id}`}>
                  <span className="author-single-event">
                    {this.state.event.userId.firstName}{" "}
                    {this.state.event.userId.lastName}
                  </span>
                </Link>
              </p>

              <p className="single-event-date-address">
                <br />
                <Icon name="calendar alternate outline" />{" "}
                {moment(this.state.event.time).format("dddd DD MMMM YYYY")}
                <br />
                <Icon name="clock outline" />{" "}
                {moment(this.state.event.time).format("hh:mm A")}
                <br />
                <Icon name="map marker alternate" />{" "}
                {this.state.event.location.formattedAddress}
              </p>
              <p className="single-event-tags-cat">
                <Label className="event-tag" size="tiny" color="black">
                  {this.state.event.category.label}
                </Label>
                <br />
                {this.state.event.tags.map((tag) => (
                  <Label
                    color="teal"
                    className="event-tag singleuser-tags"
                    size="tiny"
                    key={tag._id}
                    tag
                  >
                    {tag.label}
                  </Label>
                ))}
              </p>
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
            <div className="description-singleEvent">
              <i>
                About <br /> <span>{this.state.event.description}</span>
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
            >
              <Marker coordinates={this.state.event.location.coordinates}>
                <img
                  src=" https://img.icons8.com/color/48/000000/marker.png"
                  width="30px"
                  alt=""
                />
              </Marker>
            </Map>
          </div>
          <CommentGroup
            userId={this.state.event.userId._id}
            eventId={this.props.match.params.eventId}
          />
        </div>
      </div>
    );
  }
}

export default SingleUser;
