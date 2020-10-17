import React from 'react';
import apiHandler from "../api/apiHandler";
import { Image, Icon } from 'semantic-ui-react';
import "../styles/singleUser.css";

class SingleUser extends React.Component {

    state = {
        user: null,
    };
    componentDidMount() {
        console.log(this.props.match.params.userId)
        apiHandler
            .getOne("/api/user", this.props.match.params.userId)
            .then((apiRes) => {
                this.setState({ user: apiRes.data })
                console.log(this.state)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if(!this.state.user) {
            return <div>Loading the user...</div>
        }

        return (
            <div id="main">
                {/* <h1>Single user</h1> */}
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
                </div>
            </div>
        )
    }

}

export default SingleUser
