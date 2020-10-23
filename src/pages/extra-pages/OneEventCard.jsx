import React, { Component } from "react";
import "../../styles/OneEventCard.css";

class OneEventCard extends Component {
  render() {
    return (
      <MagazineCard
        width="100%"
        height="60vh"
        title="What's up Paris"
        desc="New in Paris or living here already! come and join us"
        src="https://kubyk-events.com/wp-content/uploads/2018/06/shoootin-photo-11-1600x500.jpg"
      />
    );
  }
}
//https://wallpaperaccess.com/full/1721374.jpg
//https://i.pinimg.com/originals/0f/ce/1c/0fce1c9ae415e640a15153ac96151f7a.jpg
//
class MagazineCard extends React.Component {
  render() {
    let style = {
      img: {
        width: this.props.width + "%",
      },
    };
    return (
      <div className="magazine_card">
        <img alt="picture" src={this.props.src} style={style.img} />
        <p className="magazine_title">{this.props.title}</p>
        <p className="magazine_desc">{this.props.desc}</p>
        <div className="splitter"></div>
        <div className="shadow" />
      </div>
    );
  }
}

export default OneEventCard;
