import React from "react";
import Cards from "../components/Card/Cards";
import "../../src/styles/global.css";
import SearchBar from "../components/SearchBar";

class Home extends React.Component {
  render() {
    return (
      <div>
        <dir>
          <SearchBar />
        </dir>
        <section className="sectionCard">
          <div className="mainCardContainer">
            <Cards />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
