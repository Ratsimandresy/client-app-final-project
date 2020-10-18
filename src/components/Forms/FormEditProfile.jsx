import React from 'react';
import API from '../../api/apiHandler';
import {withUser} from "../Auth/withUser";
import {withRouter} from "react-router-dom";
import AutoComplete from "../utils/AutoComplete";
import {
    Button,
    Card,
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
        errorMessage: null,
        firstName: '',
        lastName: '',
        newPassword: '',
        gender: '',
        profilImage: '',
        age: '',
        pseudo: '',
        address: '',
        cp: '',
        city: '',
        formattedAdress: '',
    }

    async componentDidMount() {
        try {
            const loadedUser = await API.getMe("/api/user/me");
            console.log(loadedUser);
            const {
                firstName,
                lastName,
                email,
                gender,
                age,
                password,
                profilImage,
                pseudo,
                description,
                address,
                cp,
                city,
                formattedAdress,
            } = loadedUser;
            this.setState({
                user: loadedUser,
                isLoading: false,
                firstName,
                lastName,
                email,
                password,
                age,
                profilImage,
                gender,
                pseudo,
                description,
                address,
                cp,
                city,
                formattedAdress
            });
        } catch (errApi) {
            console.log(errApi);
            this.setState({errorMessage: errApi, isLoading: false});
        }
    }

    handleChange = (event) => {
        const key = event.target.name;
        console.log('handleChange')
        console.log(event.target)
        // You can test more if you have to handle different sorts of inputs.
        const value = event.target.type === "file" ? event.target.files[0] : event.target.type === "checkbox" ? event.target.checked : event.target.value;

        this.setState({[key]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            firstName,
            lastName,
            email,
            profilImage,
            pseudo,
            age,
            address,
            newPassword,
            description,
            cp,
            city,
            
        } = this.state;
        const formattedAddress = `${address}, ${cp}, ${city}`;
        console.log(age);
        const fd = new FormData();
        fd.append("firstName", firstName);
        fd.append("lastName", lastName);
        fd.append("pseudo", pseudo);
        fd.append("email", email);
        fd.append("profilImage", profilImage);
        fd.append("age", age);
        fd.append("address", address);
        fd.append("cp", cp);
        fd.append("city", city);
        fd.append("formattedAddress", formattedAddress);
        fd.append("description", description);
        fd.append("newPassword", newPassword);

        API.updateOne("api/user/update", fd).then((resApi) => {
            console.log(resApi);
            this.props.history.push("/profile");
        }).catch((errApi) => {
            console.log(errApi);
        });
    };


    render() {
        return (<div className="form form-edit-profile"> {
            !this.state.isLoading && (<div className="container">
                <Card>
                    <form className="form form-edit-profile"
                        onChange={
                            this.handleChange
                        }
                        onSubmit={
                            this.handleSubmit
                    }>
                        <div className="form-group">
                            <label htmlFor="input-profileImage">Profil Picture</label>
                            <input id="input-profileImage" name="profilImage" type="file"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input-firstName">First Name</label>
                            <input id="input-firstName" name="firstName"
                                value={
                                    this.state.firstName
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-lastName">Last Name</label>
                            <input id="input-lastName" name="lastName"
                                value={
                                    this.state.lastName
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-pseudo">Pseudo</label>
                            <input id="input-pseudo" name="pseudo"
                                value={
                                    this.state.pseudo
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-lastName">Description</label>
                            <textarea id="input-description" row="5" name="desciption"> 
                                {this.state.description}
                            </textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-email">Email</label>
                            <input id="input-email" name="email"
                                value={
                                    this.state.email
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-password">New Password</label>
                            <input id="input-password" name="newPassword"
                                value={
                                    this.state.newPassword
                                }
                                type="password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-age">Age</label>
                            <input id="input-age" name="age"
                                value={
                                    this.state.age
                                }
                                type="number"/>
                        </div>


                        <div className="form-group">
                            <span>Gender:
                            </span>
                            <label htmlFor="input-men"> {
                                this.state.gender === 'male' ? (<input id="input-men" name="gender" value="male" type="radio" checked/>) : (<input id="input-men" name="gender" value="male" type="radio"/>)
                            }
                                Men
                            </label>

                            <label htmlFor="input-women"> {
                                this.state.gender === 'female' ? (<input id="input-women" name="gender" value="female" type="radio" checked/>) : (<input id="input-women" name="gender" value="female" type="radio"/>)
                            }
                                Women
                            </label>

                            <label htmlFor="input-other"> {
                                this.state.gender === 'other' ? (<input id="input-other" name="gender" value="other" type="radio" checked/>) : (<input id="input-other" name="gender" value="other" type="radio"/>)
                            }
                                Other
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-age">Address</label>
                            <input id="input-age" name="address"
                                value={
                                    this.state.address
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-cp">Code Postal</label>
                            <input id="input-cp" name="cp"
                                value={
                                    this.state.cp
                                }
                                type="text"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-city">City</label>
                            <input id="input-city" name="city"
                                value={
                                    this.state.city
                                }
                                type="text"/>
                        </div>
                        <Button fluid>Update</Button>
                    </form>
                </Card>
            </div>)
        } </div>)
    }

}

export default withRouter(withUser(FormEditProfile));
