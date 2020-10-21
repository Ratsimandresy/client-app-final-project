import React, {Component} from 'react';
import API from "../../api/apiHandler";
import {Card, Icon, Label} from 'semantic-ui-react';

import {withUser} from '../Auth/withUser';

import "../../styles/HomeEventItem.css";

export class ActionsLoggedUser extends Component {
    
    state = {
        favEvents: [],
        eventId: this.props.eventId,
        togglingBtns: null,
        isDisable: false,
        isLoading:true
    }

    async componentDidMount() {
        try{
            const loadUserFavEvents = await API.get_one("api/user//me/favevents");
            console.log(loadUserFavEvents);
            // console.log(loadUserFavEvents);
            console.log(this.props.eventId);
            var btnAddEvent;
            var btnRemoveEvent;
            
            console.log(loadUserFavEvents.events.includes(this.props.eventId));

            if (loadUserFavEvents.events.includes(this.props.eventId)) {
                this.setState({
                    favEvents: loadUserFavEvents.events,
                    togglingBtns: false,
                    isLoading:false
                });
            } else {
                this.setState({
                    favEvents: loadUserFavEvents.events,
                    togglingBtns: true,
                    isLoading: false
                });
            }
            this.props.getIsLoading(this.state.isLoading);
            
        } catch(errApi) {
            console.log(errApi);
        }
    }

    async addEventToFav(e, eventId) {
        try {
            e.preventDefault();
            this.setState({
                isDisable:true,
                isLoading: true,
            });
            this.props.getIsLoading(this.state.isLoading);
            console.log('addEvent: ', eventId);
            const newArr = [...this.state.favEvents];
            console.log(newArr);
            const toggling = !this.state.togglingBtns;
            
            newArr.push(eventId);
            console.log(newArr);

            const addedFav = await API.updateOne("api/user/fav-event", {events: newArr});
            console.log(addedFav);
            this.setState( {
                favEvents: addedFav.events, 
                togglingBtns:toggling,
                isDisable:false,
                isLoading:false
            });
            this.props.getIsLoading(this.state.isLoading);
            /*
            if(addedFav) {
                
            }
            */
        } catch(errApi){
            console.log(errApi);
        }
    }

    async removeEventToFav(e, eventId) {
        try {
            e.preventDefault();
            this.setState({
                isDisable:true,
                isLoading: true,
            });
            this.props.getIsLoading(this.state.isLoading);
            console.log('remove event:', eventId);
            const newArr = [...this.state.favEvents];
            console.log(newArr);
            const toggling = !this.state.togglingBtns;

            const filtredArr = newArr.filter((e) => e !== eventId);
            console.log('filtredArray', filtredArr);
            const removedFav = await API.updateOne("api/user/fav-event", {events: filtredArr});
            console.log(removedFav);
            this.setState({
                favEvents: removedFav.events, 
                togglingBtns: toggling,
                isDisable:false,
                isLoading: false
            });
            this.props.getIsLoading(this.state.isLoading);
  
            
        }catch(errApi){
            console.log(errApi)
        }
        
    }
    
    render() { // console.log(this.props.context.user.events);
        console.log(this.props);
        return (
        <div className="actions-logged-user">
             
            <div className="add-fav-event"> 
                {this.state.togglingBtns ? (
                    <button 
                        disabled={this.state.isDisable}
                        onClick={
                            (e) => {
                                this.addEventToFav(e, this.props.eventId)
                            }
                        }
                    >
                        <Icon name="heart" color="red"/>
                    </button>
                    ) : (
                    <button 
                        disabled={this.state.isDisable}
                        onClick={
                        (e) => {
                            this.removeEventToFav(e, this.props.eventId)
                        }
                    }>
                        <Icon name="heart"
                    
                    color="grey"/>
                    </button>)
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
