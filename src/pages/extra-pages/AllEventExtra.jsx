import React, { Component } from "react";
import { Link } from "react-router-dom";

class AllEventExtra extends Component {
  render() {
    return (
      <div className="main">
        <div className="cardlgcontainer">
          <p className="cardtext-sm">near paris</p>
          <h1 className="cardtext-lg">Going around with friends</h1>
          <p className="cardtext-md">
            Duis aute irure dolor in reprehenderit in voluptate nulla pariatur.
          </p>
          <Link className="cardbtn">See more</Link>
        </div>

        <div className="cardsmcontainer">
          <div className="cardsm">
            <p className="cardtextsm">Trocadero - Paris</p>
            <h1 className="cardtextlg">75016</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default AllEventExtra;
