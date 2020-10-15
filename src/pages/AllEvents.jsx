import React from 'react';
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

class AllEvents extends React.Component {
    
    state = {
         events: [],
    };
    

    componentDidMount()  {
        console.log("all events")
        apiHandler
            .getAll("/api/event")
            .then((apiRes) => {
                console.log(apiRes);
                this.setState({ events: apiRes })
            })
            .catch((apiErr) => {
                console.log(apiErr)
            })
    }

    render() {

        return (
            <div>
                <h1>All my Events</h1>
                {this.state.events.map(event => (
                    <div key={event._id}>
                        <h1>{event.name}</h1>
                    </div>
                ))}
            </div>
        )

    }
}

export default AllEvents