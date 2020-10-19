import React from "react";
import Cards from "../components/Card/Cards";
import "../../src/styles/global.css";
import SearchBar from "../components/SearchBar";

import BtnToggle from '../components/UI/btnToggle';
import {Sidebar} from 'semantic-ui-react';
// import FormEvent from "../components/Forms/FormEvent";

class Home extends React.Component {
  state = {
    event: "",
  };

  render() {
    // const HorizontalSidebar = ({ animation, direction, visible }) => (
    //   <Sidebar
    //     as={Segment}
    //     animation={animation}
    //     direction={direction}
    //     visible={visible}
    //   >
    //     Card events
    //   </Sidebar>
    // );

    return (
      <div>
        <dir>
          <SearchBar />
        </dir>
        <section className="sectionCard">
          {/*<BtnToggle />
           <Sidebar >
            Sidebare1
          </Sidebar>  */}
          <div className="mainCardContainer1">
            <Cards />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
