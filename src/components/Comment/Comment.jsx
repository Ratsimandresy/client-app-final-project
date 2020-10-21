import React, { Component } from "react";
import { withUser } from "../Auth/withUser";
import { Comment, Button, Icon } from "semantic-ui-react";
import "../../styles/comments.css";

class SingleComment extends Component {
  formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours > 12 ? "am" : "pm";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  render() {
    console.log("COMMENT PROPS=====>>>", this.props);
    const { content } = this.props;
    const today = new Date();

    return (
      <Comment.Group className="Comment">
        {this.props.context.user !== null && (
          <Comment>
            <Comment.Avatar
              style={{ width: "60px", margin: "10px" }}
              alt="avatar-image"
              src="https://cdn2.vectorstock.com/i/thumb-large/20/76/man-avatar-profile-vector-21372076.jpg"
            />
            <Comment.Content className="Content">
              <Comment.Author style={{ color: "lightblue" }} as="a">
                <p>
                  {this.props.context.user.firstName} (
                  {this.props.context.user.pseudo}){" "}
                </p>
              </Comment.Author>
              <Comment.Metadata>
                <div>{this.formatDate(today)}</div>
              </Comment.Metadata>
              <Comment.Text style={{ color: "rgb(21, 73, 73)" }}>
                {this.props.content} 
              </Comment.Text>
            </Comment.Content>
          </Comment>
        )}
      </Comment.Group>
    );
  }
}
export default withUser(SingleComment);

/**
 
-parent

  - child 1

  - child 2

 */
