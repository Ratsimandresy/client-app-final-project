import React from 'react';
import apiHandler from "../api/apiHandler";
import { Image, Icon } from 'semantic-ui-react';
import "../styles/singleUser.css";

class SingleUser extends React.Component {

    state = {
        event: null,
    };

    componentDidMount() {
        console.log(this.props.match.params.eventId)
        apiHandler
            .getOne("/api/event/", this.props.match.params.eventId)
            .then((apiRes) => {
                this.setState({ event: apiRes })
                console.log(this.state)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if(!this.state.event) {
            return <div>Loading the event...</div>
        }

        return (
            <div id="main">
                <h1>EVENT</h1>
                <h2>HELLO{this.state.event.name}</h2>
            </div>
        )
    }

}

export default SingleUser
