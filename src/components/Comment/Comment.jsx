import React, { Component } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import API from "../../api/apiHandler";
import { buildFormData } from "../utils/buildFormData";

class Comments extends Component {
  state = {
    content: "",
  };

  handlechange = (e) => {
    const name = e.target.name;
    const key = e.target.value;
    this.setState({
      [name]: key,
    });
  };

  handelSubmit = (e) => {
    e.preventDefault();
    console.log("<<<<<<<==========comment SUBMITTED =====>>>>>");

    const { content } = this.state;

    const newContent = { content: content }; //! create a new object 'cause of THE BODYYYYYYYYYY [Object: null prototype] { blablablablablablabla: '' }

    API.createOne("api/comments", newContent)
      .then((apiRes) => {
        console.log("CONTENT TWO HERE ===>>>", newContent);
        console.log("APIRES===>>>>", apiRes);
        this.setState({ content });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { content } = this.state;
    console.log("NEW VALUE OF CONTENT == >>", content);
    return (
      <Form onSubmit={this.handelSubmit}>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          <Comment>
            <Comment.Avatar
              alt="avatar"
              src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <div>Yesterday at 12:30AM</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>
                  This has been very useful for my research. Thanks as well!
                </p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
              <Comment>
                <Comment.Avatar
                  alt="avatar"
                  src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                />
                <Comment.Content>
                  <Comment.Author as="a">Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>

          <Form.TextArea
            onChange={this.handlechange}
            name="content"
            id="content"
            placeholder="Add comment"
            defaultValue={this.state.content}
          />
          <Button
            onSubmit={this.handelSubmit}
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Comment.Group>
      </Form>
    );
  }
}

export default Comments;
