import React, { Component } from "react";
import SingleComment from "./Comment";
import CommentForm from "./CommentForm";
import API from "../../api/apiHandler";
import "../../styles/comments.css";

class CommentGroup extends Component {
  state = {
    comments: [{ _id: 0, content: "this is a hard coded comment", eventId: 1 }],
  };

  componentDidMount() {
    API.getAll("/api/comments")
      .then((apiRes) => {
        console.log("APIRES!!!!!!!!!", apiRes);
        this.setState({ comments: apiRes });
      })
      .catch((err) => console.log(err));
  }

  handleCommentSubmit = (data) => {
    API.createOne("/api/comments/", data)
      .then((apiRes) => {
        console.log(apiRes);
        let comment = [...this.state.comments];
        console.log({ comment });
        comment.push({
          _id: apiRes._id,
          content: apiRes.content,
          eventId: apiRes.eventId,
        });

        this.setState({ comments: comment });
      })
      .catch((err) => console.log(err));
  };

  renderComment = (eventId) => {
    const { comments } = this.state;
    // console.log(this.props);
    console.log("EVENTID HERE!!!!!====>", eventId);
    return comments.map((comment) => {
      const { content } = comment;

      if (eventId === comment.eventId) {
        return (
          <SingleComment
            handleCommentEdit={this.handleCommentEdit}
            key={comment._id}
            content={content}
          />
        );
      }
    });
  };

  render() {
    return (
      <div
        className="commentGroup
      "
      >
        <pre> {JSON.stringify(this.props, null, 2)} </pre>

        {this.renderComment(this.props.eventId)}

        <CommentForm
          userId={this.props.userId}
          eventId={this.props.eventId}
          handleCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default CommentGroup;
