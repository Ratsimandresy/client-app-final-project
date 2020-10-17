import React from 'react';
import API from '../../api/apiHandler';
import {withUser} from "../Auth/withUser";

import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react';

class FormEditProfile extends React.Component {
    state = {
        user: null,
        isLoading: true,
        errorMessage: null
    }

    async componentDidMount() {
        try {
            const loadedUser = await API.getMe("/api/user/me");
            console.log(loadedUser);
            this.setState({user: loadedUser, isLoading: false});
        } catch (errApi) {
            console.log(errApi);
            this.setState({errorMessage: errApi, isLoading: false});
        }
    }

    render() {
        return (
            <div className="form form-edit-profile">

                <h1>FORM EDIT PROFIL</h1>
                <div className="container"> 
                    <Form> 
                    {!this.state.isLoading && (
                        <div>Test</div>
                    )}
                    </Form>
                </div>
            </div>
        )
    }

}

export default withUser(FormEditProfile);
