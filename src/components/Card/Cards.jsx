import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/Cards.css";

class Cards extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    apiHandler
      .getAll("api/event/sortedbyrate")
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({ events: apiRes });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.events.map((event, i) => (
          <div key={i} className="cardContainer">
            <div className="imgContainer">
              <img
                src="https://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/master/w_2048,h_1536,c_limit/most-beautiful-paris-louvre-GettyImages-536267205.jpg"
                alt="city"
              />
            </div>
            <div className="details">
              <p> {event.name} </p>
              <p> {event.category} </p>
              <p> {event.rate} </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;
