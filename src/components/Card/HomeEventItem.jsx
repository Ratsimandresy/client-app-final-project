import React, {Component} from 'react';
import {withUser} from '../Auth/withUser';
import { Card, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import "../../styles/HomeEventItem.css";

const HomeEventItem = (props) => {
    console.log(props);
    const { _id, getCoordo, name, description, userId, location, mainImageUrl, category } = props;
    
    const sendCoordinates = (evt, coordos) => {
        evt.preventDefault();
        console.log('click');
        getCoordo(coordos);
    }

    return (
        <Card key={_id} className="home-event-item">
        <div className="img-container">
          <Link to={`/all-events/${_id}`}> 
            <img src={mainImageUrl} alt="" /> 
          </Link>

          <p className="event-description">{description.substring(0, 50)}</p>
          <Label color="orange">{category.label}</Label>
          <address>{location.formattedAddress}</address>
          <p className="event-author"><strong>Author: </strong>{userId.firstName || userId.pseudo}</p>
          <div className="actions-btn">
              <Link key={name} to={`/all-events/${_id}`}> 
                <Icon name="eye" color="black"/>
              </Link>
              <Icon name="map marker alternate" onClick={(e) => {sendCoordinates(e, location.coordinates)}} color="black"/>                          
              {props.context.isLoggedIn && (
                <div className="actions-favoris">
                  <div className="add-fav-event">
                      <Icon name="heart" color="green" />
                      <Icon name="heart" color="red" />
                  </div>

                  <div className="add-like-event">
                      <Icon name="thumbs up outline" color="green"/>
                      <Icon name="thumbs up" color="red"/>
                  </div>

                  <div className="add-fav-user">
                      <Icon name="add user" color="green"/>
                      <Icon name="remove user" color="red"/>
                  </div>
                </div>
              )}
          </div>           
        </div>       
        </Card>
    )
    
}

export default withUser(HomeEventItem);
