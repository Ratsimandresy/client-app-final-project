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
            const loadedUser = await API.get_one("api/user/me/favevents");
            /* return the user */
            console.log(loadedUser);
            // console.log(loadUserFavEvents);
            console.log('EventId: ', this.props.eventId);
            console.log('arr loeadedUsefavorites', loadedUser.favorites);
            console.log('Test si eventId is in Favorites: ', loadedUser.favorites.includes(this.props.eventId));
            console.log('------', this.props.getIsLoading);
            if (loadedUser.favorites.includes(this.props.eventId)) {
                this.setState({
                    favEvents: loadedUser.favorites,
                    togglingBtns: false,
                    isLoading:false
                });
            } else {
                this.setState({
                    favEvents: loadedUser.favorites,
                    togglingBtns: true,
                    isLoading: false
                });
            }
            
            
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
            this.props.getIsLoading(true);
            console.log('addEvent: ', eventId);
            const newArr = [...this.state.favEvents];
            console.log(newArr);
            const toggling = !this.state.togglingBtns;
            
            newArr.push(eventId);
            console.log(newArr);

            const addedFav = await API.updateOne("api/user/fav-event", {favorites: newArr});
            console.log(addedFav);
            this.setState( {
                favEvents: addedFav.events, 
                togglingBtns:toggling,
                isDisable:false,
                isLoading:false
            });
            this.props.getIsLoading(false);
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
            this.props.getIsLoading(true);
            console.log('remove event:', eventId);
            const newArr = [...this.state.favEvents];
            console.log(newArr);
            const toggling = !this.state.togglingBtns;

            const filtredArr = newArr.filter((e) => e !== eventId);
            console.log('filtredArray', filtredArr);
            const removedFav = await API.updateOne("api/user/fav-event", {favorites: filtredArr});
            console.log(removedFav);
            this.setState({
                favEvents: removedFav.events, 
                togglingBtns: toggling,
                isDisable:false,
                isLoading: false
            });
            this.props.getIsLoading(false);
  
            
        }catch(errApi){
            console.log(errApi);
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
