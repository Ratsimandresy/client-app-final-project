import React, { Component } from 'react';

import whatupAPI from '../api/apiHandler';

class AllUsers extends Component {

    state = {
        users:[],
        isLoading: true,
        error: null
    }

    async componentDidMount() {
        try {
            const allUsers = await whatupAPI.getAll("/api/user");
            console.log(allUsers);

            this.setState({
                users:allUsers,
            });
        }catch(errApi){
            console.log(errApi);
            this.setState({
                errApi,
            });
        }
    }

    render() {
        return (
            <div className="page page-all-users">
                <div className="contaienr">
                    <h1 className="page-title">Page AllUsers</h1>
                </div>                
            </div>
        )
    }
}

export default AllUsers;
