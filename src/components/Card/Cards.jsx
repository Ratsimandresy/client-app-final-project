import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/Cards.css";
import { Link } from "react-router-dom";

class Cards extends Component {
  state = {
    events: [],
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .getAll("api/event/sortedbyrate")
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({ events: apiRes, isLoading: false });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="MainContainer">
        {this.state.events.map((event, i) => (
          <Link key={event.name} to={`/all-events/${event._id}`}>
            <div className="cardContainer">
              <div className="imgContainer">
                <img
                  src="https://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/master/w_2048,h_1536,c_limit/most-beautiful-paris-louvre-GettyImages-536267205.jpg"
                  alt="city"
                />
              </div>
              <div className="details">
                <h4> {event.name} </h4>
                <div className="category-cards">
                  <p className="cat-cards-p"> {event.category.label} </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Cards;
