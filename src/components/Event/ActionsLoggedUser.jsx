import React, {Component} from 'react';
import API from "../../api/apiHandler";
import {Card, Icon, Label} from 'semantic-ui-react';

import {withUser} from '../Auth/withUser';

import "../../styles/HomeEventItem.css";

export class ActionsLoggedUser extends Component {
    state = {
        favEvents: [],
        eventId: this.props.eventId,
        btnAddEvent: null,
        btnRemoveEvent: null
    }

    async componentDidMount() {
        try{
            const loadUserFavEvents = await API.get_one("api/user//me/favevents");
            console.log(loadUserFavEvents);
            // console.log(loadUserFavEvents);
            console.log(this.props.eventId);
            var btnAddEvent;
            var btnRemoveEvent;
            if (loadUserFavEvents.events.includes(this.props.eventId)) {
    
               btnAddEvent = false;
               btnRemoveEvent = true;
                console.log('is in');
            } else {
                btnAddEvent = true;
                btnRemoveEvent= false;
                console.log('is not');
            }
            this.setState({
                favEvents: loadUserFavEvents.events,
                btnAddEvent,
                btnRemoveEvent,
            });
        } catch(errApi) {
            console.log(errApi)
        }
       
    }

    addEventToFav = async (e, eventId) => {
        try {
            e.preventDefault();
            console.log('addEvent');
            const newArr = [...this.state.favEvents];
            const btnAddEvent = !this.state.btnAddEvent;
            const btnRemoveEvent = ! btnAddEvent;

            newArr.push(eventId);
            console.log(newArr);

            const addedFav = await API.updateOne("api/user/fav-event", {events: newArr});
            console.log(addedFav)
            if(addedFav) {
                this.setState( {
                    favEvents: addedFav, 
                    btnAddEvent, 
                    btnRemoveEvent
                });
            }
        } catch(errApi){
            console.log(errApi);
        }
        
        
    }

    removeEventToFav = async (e, eventId) => {
        try {
            e.preventDefault();
            console.log('remove event');
            const newArr = [...this.state.favEvents];
            const btnAddEvent = !this.state.btnAddEvent;
            const btnRemoveEvent = ! btnAddEvent;

            const filtredArr = newArr.filter((e) => e !== eventId);
            console.log('filtredArray', filtredArr);
            const removedFav = await API.updateOne("api/user/fav-event", {events: filtredArr});
            console.log(removedFav);
            if(removedFav){
                this.setState({favEvents: removedFav, btnAddEvent, btnRemoveEvent});
            }
            
        }catch(errApi){
            console.log(errApi)
        }
        
    }

    render() { // console.log(this.props.context.user.events);
        return (<div className="actions-logged-user">

            <div className="add-fav-event"> {
                this.state.btnAddEvent ? (<Icon name="heart"
                    onClick={
                        (e) => {
                            this.addEventToFav(e, this.props.eventId)
                        }
                    }
                    color="red"/>) : (<Icon name="heart"
                    onClick={
                        (e) => {
                            this.removeEventToFav(e, this.props.eventId)
                        }
                    }
                    color="grey"/>)
            } </div>

            <div className="add-like-event">
                <Icon name="thumbs up" color="gray"/>
                <Icon name="thumbs up" color="red"/>
            </div>

            <div className="add-fav-user">
                <Icon name="add user" color="green"/>
                <Icon name="remove user" color="red"/>
            </div>
        </div>)
    }
}

export default withUser(ActionsLoggedUser);
