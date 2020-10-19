import React, {Component} from 'react';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";
import apiHandler from '../../api/apiHandler';
import {Link} from 'react-router-dom';
import {Label} from 'semantic-ui-react';

import "../../styles/EventDetails.css";


const Map = ReactMapboxGl({accessToken: process.env.REACT_APP_MAPBOX_TOKEN});

class EventDetails extends Component {
    state = {
        event: null,
        isLoading: true,
        lng: 2.349014, // Default lng and lat set to the center of paris.
        lat: 48.864716,
        zoom: 12, // used for map zoom level
    }

    async componentDidMount() {
        const currentEvent = await apiHandler.getOne("api/event/", this.props.match.params.id);
        console.log('currentEvent: ', currentEvent);

        if (currentEvent) {
            this.setState({isLoading: false, event: currentEvent, lng: currentEvent.location.coordinates[0], lat: currentEvent.location.coordinates[1]});
        }
    }

    render() {
        console.log(this.props.match.params.id);
        return (<div className="page page-profile-event-details"> {
            !this.state.isLoading && (<div className="container">
                <Link to="/profile">Back</Link>
                <h1 className="event-name"> {
                    this.state.event.name
                }</h1>
                <img src={
                        this.state.event.mainImageUrl
                    }
                    alt={
                        this.state.event.name
                    }/>
                <p className="event-description"> {
                    this.state.event.description
                }</p>
                <p> {
                    this.state.event.location.formattedAddress
                }</p>
                <p>
                    <strong>Category:
                    </strong>
                    <Label className="event-tag" size='tiny' color='orange'> {
                        this.state.event.category.label
                    } </Label>
                </p>
                <div className="tags-list">
                    <strong>Tags:
                    </strong>
                    {
                    this.state.event.tags.map(tag => (<Label className="event-tag" size='tiny' color='teal'
                        key={
                            tag._id
                        }
                        tag> {
                        tag.label
                    } </Label>))
                } </div>
                <div className="map-container">
                    <Map style="mapbox://styles/mapbox/light-v10"
                        zoom={
                            [12]
                        }
                        containerStyle={
                            {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                height: 300 + 'px'
                            }
                        }
                        center={
                            [this.state.lng, this.state.lat]
                    }>
                        <Marker coordinates={
                            this.state.event.location.coordinates
                        }>
                            <img src=" https://img.icons8.com/color/48/000000/marker.png" width="30px" alt=""/>
                        </Marker>

                    </Map>
                </div>
            </div>)
        } </div>)
    }

}

export default EventDetails
