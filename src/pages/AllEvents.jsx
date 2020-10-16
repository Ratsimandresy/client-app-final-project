import React from 'react';
import apiHandler from "../api/apiHandler";
import Cards from "../components/Card/Cards";

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
                <h1>All the Events</h1>
                <div>      
                </div>
                {this.state.events.map(event => (
                    <div key={event._id}>
                        <Cards />
                    </div>
                ))}
            </div>
        )

    }
}

export default AllEvents
