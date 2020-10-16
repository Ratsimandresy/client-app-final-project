import React from 'react';
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";

class AllUsers extends React.Component {
    
    state = {
         users: [],
         isLoading: true,
         error: null
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
            <div className="page page-all-users">
                <h1 className="page-title">All the users</h1>
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




// import React, { Component } from 'react';

// import whatupAPI from '../api/apiHandler';

// class AllUsers extends Component {

//     state = {
//         users:[],
//         isLoading: true,
//         error: null
//     }

//     async componentDidMount() {
//         try {
//             const allUsers = await whatupAPI.getAll("/api/user");
//             console.log(allUsers);

//             this.setState({
//                 users:allUsers,
//             });
//         }catch(errApi){
//             console.log(errApi);
//             this.setState({
//                 errApi,
//             });
//         }
//     }

//     render() {
//         return (
//             <div className="page page-all-users">
//                 <div className="contaienr">
//                     <h1 className="page-title">Page AllUsers</h1>
//                 </div>                
//             </div>
//         )
//     }
// }

// export default AllUsers;
