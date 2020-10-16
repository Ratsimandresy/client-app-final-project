import React from 'react'
import apiHandler from "../../api/apiHandler";

class UserCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
        }

        // console.log(this.props)

    }
    
    render() {
        const user = { ...this.props.user }
        console.log(user)
        return (
            <div>
                <img src={user.profilImage} alt="profil picture" width="40px" />
                <p>{user.email}</p>
            </div>
        )

    }

}

export default UserCard
