import React from 'react';
import apiHandler from "../api/apiHandler";
import { Image, Icon } from 'semantic-ui-react';
import "../styles/singleUser.css";

class SingleUser extends React.Component {

    state = {
        user: null,
        event: null,
    };
    
    componentDidMount() {
        apiHandler
            .getOne("/api/user/", this.props.match.params.userId)
            .then((apiRes) => {
                console.log(apiRes)
                apiHandler
                    .getAll("/api/event/ofaspecificuser/"+this.props.match.params.userId )
                    .then((apiResult) => {
                        this.setState({event: apiResult})
                        // console.log("hello",this.state)
                    })
                this.setState({ user: apiRes })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if(!this.state.user) {
            return <div>Loading the user...</div>
        } else if (!this.state.event) {
            return <div>Loading the user...</div>
        }

        return (
            <div id="main">
                <div id="singleUser-main">
                    <div className="singleUser-container">
                        <div>
                            <h1>{this.state.user.lastName} {this.state.user.firstName}</h1>
                            <br />
                            <p>pseudo <br /> <span>{this.state.user.pseudo}</span></p>
                        </div>
                        <Image src={this.state.user.profilImage} size='medium' rounded alt="profil picture" width="100px" />
                    </div>
                        <p>email <br /> <span>{this.state.user.email}</span></p><br />
                        <p>adresse <br /> <span>{this.state.user.address}</span></p><br />
                        <p>age <br /> <span>{this.state.user.age} ans</span></p><br />
                        <p>genre <br /> <span>{this.state.user.gender}</span></p><br />
                        <p><div className="description-singleUser"><i>A propos <br /> <span>{this.state.user.description}</span></i></div></p>
                        {this.state.event.map(event => (
                        <p>{event.name}</p>
                        ))}
                </div>
            </div>
        )
    }

}

export default SingleUser
