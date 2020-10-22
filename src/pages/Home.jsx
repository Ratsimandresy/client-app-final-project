import React from "react";
// import Cards from "../components/Card/Cards";
import "../../src/styles/global.css";
import "../../src/styles/Home.css";
import "../styles/NavMain.css";
import OneEventCard from "../pages/extra-pages/OneEventCard";

// import SearchBar from "../components/SearchBar";
import SearchBar from "../components/SearchBar/SearchBar";
import { withUser } from "../components/Auth/withUser";
import HomeEventItem from "../components/Card/HomeEventItem";
import {
  Sidebar,
  Segment,
  Checkbox,
  Card,
  Icon,
  Label,
} from "semantic-ui-react";
import API from "../api/apiHandler";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import SpinnerLoader from "../components/Loader/spinnerLoader";

import "aos/dist/aos.css";

const Map = ReactMapboxGl(
  { accessToken: process.env.REACT_APP_MAPBOX_TOKEN },
  { height: "100%" }
);

class Home extends React.Component {
  state = {
    events: [],
    btnToggle: false,
    visible: false,
    lng: 2.349014, // Default lng and lat set to the center of paris.
    lat: 48.864716,
    zoom: 12,
    isLoading: true,
    animations: {
      direction: "right",
      animation: "push",
      visible: false,
    },
  };

  async componentDidMount() {
    try {
      const events = await API.getAll("api/event/sortedbyrate");
      if (events) {
        this.setState({
          isLoading: false,
          events,
        });
      }
    } catch (errApi) {
      console.log(errApi);
      this.setState({
        isLoading: false,
      });
    }
  }

  handleSidebarHide = (param) => this.setState({ visible: param });

  centerEventOnMap = (param) => {
    //console.log(param);
    const toggle = !this.state.btnToggle;
    this.setState({
      lng: param[0],
      lat: param[1],
      btnToggle: toggle,
    });
  };

  handlerToggle = () => {
    console.log("handlerToggle");
    if (this.state.btnToggle) this.handleSidebarHide(this.state.btnToggle);
    else {
      this.handleSidebarHide(this.state.btnToggle);
    }
    const toggle = !this.state.btnToggle;

    this.setState({ btnToggle: toggle });
  };

  render() {
    return (
      <div className="page page-home">
        <OneEventCard data-aos="fade-in" />
        {this.state.isLoading && <SpinnerLoader />}
        <div>
          <SearchBar />
        </div>
        <section className="sectionCard">
          <div data-aos="fade-out" data-aos-duration="2000">
            <div className="container-toggle">
              <Checkbox
                toggle
                checked={this.state.btnToggle}
                onClick={this.handlerToggle}
              />
            </div>

            <Sidebar.Pushable
              style={{ height: "80vh", border: "none" }}
              as={Segment}
            >
              <Sidebar
                as={Segment}
                animation={this.state.animations.animation}
                icon="labeled"
                inverted
                onHide={this.handleSidebarHide}
                vertical
                direction="right"
                visible={this.state.btnToggle}
                width="very wide"
              >
                <div className="container-map">
                  <Map
                    style="mapbox://styles/mapbox/light-v10"
                    zoom={[12]}
                    containerStyle={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      border: "none",
                      height: "80vh",
                      position: "absolute",
                    }}
                    center={[this.state.lng, this.state.lat]}
                  >
                    {this.state.events.map((event) => (
                      <Marker
                        key={event._id}
                        coordinates={event.location.coordinates}
                      >
                        <img
                          src=" https://img.icons8.com/color/48/000000/marker.png"
                          width="30px"
                          alt=""
                        />
                      </Marker>
                    ))}
                  </Map>
                </div>
              </Sidebar>
              <Sidebar.Pusher>
                <Card.Group
                  data-aos="zoom-in"
                  style={{ margin: "10px" }}
                  itemsPerRow={5}
                >
                  {this.state.events.map((event) => (
                    <HomeEventItem
                      key={event._id}
                      {...event}
                      getCoordo={this.centerEventOnMap}
                    />
                  ))}
                </Card.Group>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </section>
      </div>
    );
  }
}

export default withUser(Home);
