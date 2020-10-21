import React from "react";
import apiHandler from "../api/apiHandler";
import {Image, Accordion, Icon} from "semantic-ui-react";
import "../styles/singleUser.css";
import {Link} from "react-router-dom";
import SpinnerLoader from '../components/Loader/spinnerLoader';

class SingleUser extends React.Component {
    state = {
        user: null,
        event: null,
        activeIndex: 0,
        isLoading: true
    };

    componentDidMount() {
        apiHandler.getOne("/api/user/", this.props.match.params.userId).then((apiRes) => {
            console.log(apiRes);
            apiHandler.getAll("/api/event/ofaspecificuser/" + this.props.match.params.userId).then((apiResult) => {
                this.setState({event: apiResult});
                console.log("hello", this.state);
            });
            this.setState({user: apiRes});
        }).catch((error) => {
            console.log(error);
        }). finally(() => {
            this.setState({isLoading: false});
        });
    }

    handleClickAccordion = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    render() {

        return (<div id="main-singleuser"> {
            this.state.isLoading && this.state.user === null ? (<SpinnerLoader/>) : (<div id="singleUser-main">
                <div className="singleUser-container">
                    <div>
                        <h1> {
                            this.state.user.lastName
                        }
                            {
                            this.state.user.firstName
                        } </h1>
                        <br/>
                        <p>
                            pseudo
                            <br/>
                            <span> {
                                this.state.user.pseudo
                            }</span>
                        </p>
                    </div>
                    <Image src={
                            this.state.user.profilImage
                        }
                        size="medium"
                        rounded
                        alt="profil picture"
                        width="100px"/>
                </div>
                <div>
                    <p>
                        email
                        <br/>
                        <span> {
                            this.state.user.email
                        }</span>
                    </p>
                    <br/>
                    <p>
                        adresse
                        <br/>
                        <span> {
                            this.state.user.address
                        }</span>
                    </p>
                    <br/>
                    <p>
                        age
                        <br/>
                        <span> {
                            this.state.user.age
                        }
                            ans</span>
                    </p>
                    <br/>
                    <p>
                        genre
                        <br/>
                        <span> {
                            this.state.user.gender
                        }</span>
                    </p>
                    <br/>
                    <p>
                        <div className="description-singleUser">
                            <i>
                                A propos
                                <br/>
                                <span> {
                                    this.state.user.description
                                }</span>
                            </i>
                        </div>
                    </p>
                </div>
                <div>
                    <Accordion styled>
                        <Accordion.Title active={
                                this.state.activeIndex === 0
                            }
                            index={0}
                            onClick={
                                this.handleClickAccordion
                        }>
                            <Icon name="dropdown"/>
                            Evenements créés
                        </Accordion.Title>
                        <Accordion.Content active={
                            this.state.activeIndex === 0
                        }> {
                            this.state.event !== null && (<> {
                                this.state.event.map((event) => (<Link key={
                                        event._id
                                    }
                                    to={
                                        `/all-events/${
                                            event._id
                                        }`
                                }>
                                    <div id="event-singleuser-container">
                                        <div>
                                            <img src={
                                                    event.mainImageUrl
                                                }
                                                alt="eventImage"
                                                width="100px"/>
                                        </div>
                                        <div id="event-singleuser-name-descr">
                                            <h4> {
                                                event.name
                                            }</h4>
                                            <p className="event-description-singleuser"> {
                                                event.description
                                            } </p>
                                        </div>
                                    </div>
                                </Link>))
                            } </>)
                        } </Accordion.Content>
                    </Accordion>
                </div>
            </div>)
        } </div>);
    }
}

export default SingleUser;
