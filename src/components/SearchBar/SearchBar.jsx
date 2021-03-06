import React, { Component } from "react";
import "../../styles/SearchBar.css";
import API from "../../api/apiHandler";
import { Link } from "react-router-dom";
import SearchCards from "./SearbarCard";
import { Input, Grid, Search } from "semantic-ui-react";
import _ from "lodash";
import Aos from "aos";

class SearchBar extends Component {
  state = {
    initialEvents: [],
    events: [],
    isLoading: false,
    value: "",
    displayed: true,
  };

  filterList = (e) => {
    if(e.target.value === '') {
      this.setState({
        displayed: false,
        isLoading: false,
      }); 
    } else {
      var updatedEvents = this.state.initialEvents;
      updatedEvents = updatedEvents.filter(function (oneEvent) {
        console.log(oneEvent);
        return (
          oneEvent.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
      });
      
      this.setState({
        displayed: true,
        events: updatedEvents,
        isLoading: true,
      });
    }
  };
  onKeyUp = (e) => {
    console.log(this.state.initialEvents);
  };

  componentWillMount = () => {
    API.getAll("/api/event")
      .then((apiRes) => {
        this.setState({ initialEvents: apiRes });
      })
      .catch((err) => console.log(err));
  };


  render() {
    const { isLoading } = this.state;
    return (
      <div className="search">
        {/* <pre> {JSON.stringify(this.state, null, 2)} </pre> */}
        <Grid.Column width={10}>
          <Search
            placeholder="search a post"
            showNoResults={false}
            onSearchChange={_.debounce(this.filterList, 500, {
              leading: true,
            })}
            
          />
        </Grid.Column>

        {this.state.displayed && (<>
        <ul> 
          {this.state.events.map((oneEvent) => (
            <div
              data-aos="zoom-in"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              key={oneEvent._id}
            >
              <Link to={`/all-events/${oneEvent._id}`}>
                <SearchCards oneEvent={oneEvent} />
              </Link>
            </div>
          ))}         
        </ul>
        </>)}
        
      </div>
    );
  }
}

export default SearchBar;
