import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import "../../styles/Cards.css";

class Cards extends Component {

  render() {
    console.log("---------------------->",this.props.event)
    return (
      <div>
        <div className="cardContainer cardContainer-cards">
          <div className="imgContainer">
            <img
              src={this.props.event.mainImageUrl}
              alt="city"
              height="200px"
            />
          </div>
          <div className="details">
            <p><h3> {this.props.event.name} </h3></p>
            <p>note: {this.props.event.noteAverage} </p>
            <p>by : {this.props.event.userId.firstName} {this.props.event.userId.lastName}</p>
            <div className="category-cards">
                <p className="cat-cards-p"> {this.props.event.category.label} </p>
              </div>
          </div>
        </div>
    </div>
    );
  }
}

export default Cards;
