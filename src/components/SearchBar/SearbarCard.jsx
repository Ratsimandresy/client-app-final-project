import React, { Component } from "react";
import "../../styles/Cards.css";

class SearchCards extends Component {
  render() {
    console.log("---------------------->", this.props.oneEvent);
    return (
      <div>
        {this.props.oneEvent && (
          <div className="cardContainer cardContainer-cards">
            <div className="imgContainer">
              <img
                src={this.props.oneEvent.mainImageUrl}
                alt="city"
                height="200px"
              />
            </div>
            <div className="details">
              <h3> {this.props.oneEvent.name} </h3>
              <p>note: {this.props.oneEvent.noteAverage} </p>
              <p>
                by : {this.props.oneEvent.userId.firstName}{" "}
                {this.props.oneEvent.userId.lastName}
              </p>
              <div className="category-cards">
                <p className="cat-cards-p">
                  {" "}
                  {this.props.oneEvent.category.label}{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchCards;
