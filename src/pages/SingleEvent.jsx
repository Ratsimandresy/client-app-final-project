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
                console.log("------------------",apiRes)
                this.setState({ event: apiRes })
                // console.log(this.state)
                // console.log(this.state.event.userId)
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
                <div id="singleUser-main">
                    <div className="singleUser-container">
                        <div>
                            <h1>EVENT</h1>
                            <h2>{this.state.event.name}</h2>
                            <br />
                            <p>Un événement créé par :  <br /> <span>{this.state.event.userId.firstName} {this.state.event.userId.lastName}</span></p>
                        </div>
                        <Image src={this.state.event.mainImageUrl} size='medium' rounded alt="profil picture" width="100px" />
                    </div>
                    <p><div className="description-singleUser"><i>A propos <br /> <span>{this.state.event.description}</span></i></div></p>
                </div>
            </div>
        )
    }

}

export default SingleUser
