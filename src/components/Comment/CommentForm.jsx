import React, { Component } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { withUser } from "../Auth/withUser";
import "../../styles/comments.css";

class CommentForm extends Component {
  state = {
    content: "",
    eventId: this.props.eventId,
    userId: this.props.userId,
  };

  handleChange = (e) => {
    // console.log(this.props);
    // console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  resetingComment = () => {
    this.setState({ content: "" });
  };

  render() {
    return (
      <div>
        <Form className="commentForm">
          <textarea
            style={{ height: "20px", width: "800px" }}
            name="content"
            onChange={this.handleChange}
            placeholder="add coment here"
            value={this.state.content}
          ></textarea>
          <Button
            size="small"
            content="Add comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={(e) => {
              this.props.handleCommentSubmit(this.state);
              this.resetingComment();
            }}
          />
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Form>
      </div>
    );
  }
}

export default withUser(CommentForm);
