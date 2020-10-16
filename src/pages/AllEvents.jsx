import React from 'react';
import apiHandler from "../api/apiHandler";
import AllEventsCard from "../components/Card/AllEventsCard";
import "../styles/allEvents.css";


class AllEvents extends React.Component {
    
    state = {
         events: [],
    };
    

    componentDidMount()  {
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
            <div >
                <h1>All the Events</h1>
                <div className="all-events-flex-container">
                {this.state.events.map(event => (
                    <div key={event._id}>
                        <AllEventsCard event={event} />
                    </div>
                ))}
                </div>
            </div>
        )

    }
}

export default AllEvents
