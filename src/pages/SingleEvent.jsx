import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";
import { Image, Label, Icon, Button } from "semantic-ui-react";
import "../styles/singleUser.css";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import SpinnerLoader from "../components/Loader/spinnerLoader";
import CommentGroup from "../components/Comment/CommentGroup";
import { ActionsLoggedUser } from "../components/Event/ActionsLoggedUser";
import moment from "moment";
import "../styles/SingleEvent.css";

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

let frDate;

class SingleUser extends React.Component {
  state = {
    event: null,
    isLoading: true,
    lng: 2.349014,
    lat: 48.864716,
    zoom: 12,
    user: this.props.context.user,
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
            user: this.props.context.user,
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

  handlerIsLoading = (isLoading) => {
    console.log("callback loading ----------", isLoading);
    this.setState({ isLoading: isLoading });
    console.log(this.state.isLoading);
  };

  handlerRemoveFavorite = () => {
    console.log("handler remove fav");
  };

  render() {
    return (
      <div className="main-global-singleevent">
        {" "}
        {/* <pre>{JSON.stringify(this.props.match, null, 2)}</pre> */}
        {this.state.isLoading && <SpinnerLoader />}
        {!this.state.isLoading && (
          <div className="singleEvent-main">
            <div className="singleEvent-container">
              <div>
                <h1>{this.state.event.name}</h1>
                <br />
                <p>
                  Un événement créé par :
                  <br />
                  <div className="author-single-event">
                    <Link to={`/all-users/${this.state.event.userId._id}`}>
                      <span>
                        {" "}
                        {this.state.event.userId.firstName}{" "}
                        {this.state.event.userId.lastName}{" "}
                      </span>
                    </Link>
                  </div>
                  <p>
                    <br />
                    <Icon name="calendar alternate outline" />{" "}
                    {moment(this.state.event.time).format("dddd DD MMMM YYYY")}
                    <br />
                    <Icon name="clock outline" />{" "}
                    {moment(this.state.event.time).format("hh:mm A")}
                    <br />
                    <Icon name="map marker alternate" />{" "}
                    {this.state.event.location.formattedAddress}{" "}
                  </p>
                </p>
                <div id="singleuser-mini-infos">
                  <div>
                    <Label className="event-tag" size="tiny" color="orange">
                      {" "}
                      {this.state.event.category.label}{" "}
                    </Label>
                  </div>
                  <br />
                  <div>
                    {this.state.event.tags.map((tag) => (
                      <Label
                        color="teal"
                        className="single-event-tags-cat"
                        size="tiny"
                        key={tag._id}
                        tag
                      >
                        {" "}
                        {tag.label}
                      </Label>
                    ))}
                  </div>
                  <div id="actions-logged-user-like-etc">
                    <ActionsLoggedUser
                      eventId={this.props.match.params.eventId}
                      deleteFavEvent={this.handlerRemoveFavorite}
                      getIsLoading={this.handlerIsLoading}
                    />
                  </div>
                </div>
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
                <i>About</i>
                <br />
                <span> {this.state.event.description}</span>
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
        )}
        <div className="singleuser-return-btn">
          <Link to="/all-events">
            <Button basic color="teal">
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withUser(SingleUser);
