import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import {Link} from 'react-router-dom';
import {Label} from 'semantic-ui-react';

class EventDetails extends Component {
    state = {
        event: null,
        isLoading: true,
    }

    async componentDidMount() {
        const currentEvent = await apiHandler.getOne("api/event/", this.props.match.params.id);
        console.log('currentEvent: ', currentEvent);
        if(currentEvent) {
            this.setState({
                isLoading: false,
                event: currentEvent,
            });
        }
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="page page-profile-event-details">
                {!this.state.isLoading && (
                    <div className="container">
                    <Link to="/profile">Back</Link>
                        <h1 className="event-name">{this.state.event.name}</h1>
                        <img src={this.state.event.mainImageUrl} alt={this.state.event.name} />
                        <p>{this.state.event.description}</p>
                        <p>{this.state.event.category}</p>
                        <div className="tags-list">
                        
                        {this.state.event.tags.map(tag => (
                            <Label className="event-tag" size='tiny' color='teal'  key={tag._id} tag>
                                {tag.label}
                            </Label>
                        ))}
                        </div>
                    </div>
                )}
                
            </div>
        )
    }
    
}

export default EventDetails
