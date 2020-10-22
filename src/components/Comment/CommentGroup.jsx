import React, { Component } from "react";
import SingleComment from "./Comment";
import CommentForm from "./CommentForm";
import API from "../../api/apiHandler";
import "../../styles/comments.css";

class CommentGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    API.getAll("/api/comments")
      .then((apiRes) => {
        console.log("APIRES!!!!!!!!!", apiRes);
        this.setState({ comments: apiRes });
      })
      .catch((err) => console.log(err));
  }

  async handleCommentSubmit(data) {
    try {
      const newComment = await API.createOne("/api/comments", data);

      console.log(newComment);
      let currentEvent = await API.getOne("/api/event/", this.props.eventId);
      console.log(currentEvent);
      console.log(typeof currentEvent);

      let newArrComment = [...currentEvent.comments];
      newArrComment.push(newComment);
      console.log(newArrComment);

      const updatedEvent = await API.updateOne(
        "/api/event/" + newComment.eventId,
        { comments: newArrComment }
      );

      const addedComment = await API.getOne("/api/event/", this.props.eventId);

      console.log("LIGNE 43 ====>>>", addedComment.comments);

      console.log(this.state);

      if (addedComment) {
        this.setState({ comments: addedComment.comments });
      }
    } catch (err) {
      console.log(err);
    }
  }
  

  // state = {
  //   comments: [{ _id: 0, content: "this is a hard coded comment", eventId: 1 }],
  //   commentInEvent: [],
  // };

  // componentDidMount() {
  //   API.getAll("/api/event")
  //     .then((apiRes) => {
  //       console.log("APIRES!!!!!!!!!", apiRes);
  //       this.setState({ comments: apiRes });
  //     })
  //     .catch((err) => console.log(err));
  // }

  // handleCommentSubmit = (data) => {
  //   console.log("THIS IS THIS===>>", this);

  //   API.createOne("/api/comments/", data)
  //     .then((apiRes) => {
  //       console.log(apiRes);
  //       let comment = [...this.state.comments];
  //       console.log({ comment });
  //       comment.push({
  //         _id: apiRes._id,
  //         content: apiRes.content,
  //         eventId: apiRes.eventId,
  //       });

  //       console.log("THIS PROPS====>>", this.props.eventId);

  //       this.setState({ comments: comment });

  //       API.updateOne("/api/event/" + this.props.eventId, apiRes).then(
  //         (event) => {
  //           console.log("THIS IS SECOND THIS===>>", this);
  //           console.log("HEREEEE EVENT!!!!", event);
  //           event.comments.push(apiRes);
  //           let commentInEvent = [...event.comments];
  //           commentInEvent.push(apiRes);
  //           this.setState({ commentInEvent });
  //         }
  //       );
  //     })
  //     .catch((err) => console.log(err));
  // };

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
        {/* <pre> {JSON.stringify(this.props, null, 2)} </pre> */}

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
