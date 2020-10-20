import React, { Component } from "react";
import SingleComment from "./Comment";
import CommentForm from "./CommentForm";
import API from "../../api/apiHandler";
import "../../styles/comments.css";

class CommentGroup extends Component {
  state = {
    comments: [{ _id: 0, content: "this is a hard coded comment" }],
  };

  componentDidMount() {
    API.getAll("/api/comments")
      .then((apiRes) => {
        console.log(apiRes);
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
        });

        this.setState({ comments: comment });
      })
      .catch((err) => console.log(err));
  };

  handleCommentEdit = () => {
    console.log("edited!!!!!!");
  };

  renderComment = () => {
    const { comments } = this.state;
    return comments.map((comment) => {
      const { content } = comment;
      return (
        <SingleComment
          handleCommentEdit={this.handleCommentEdit}
          key={comment._id}
          content={content}
        />
      );
    });
  };

  render() {
    return (
      <div
        className="commentGroup
      "
      >
        {this.renderComment()}
        <CommentForm handleCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

export default CommentGroup;


