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
    return <div className="cardContainer"></div>;
  }
}

export default Cards;
