import React from 'react';
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

class AllUsers extends React.Component {
    
    state = {
         users: [],
    };
    

    componentDidMount()  {
        console.log("all users")
        apiHandler
            .getAll("/api/user")
            .then((apiRes) => {
                console.log(apiRes);
                this.setState({ users: apiRes })
            })
            .catch((apiErr) => {
                console.log(apiErr)
            })
    }

    render() {

        return (
            <div>
                <h1>All the users</h1>
                {this.state.users.map(user => (
                    <div key={user._id}>
                        <UserCard user={user} />
                    </div>
                ))};
            </div>
        )

    }
}

export default AllUsers
