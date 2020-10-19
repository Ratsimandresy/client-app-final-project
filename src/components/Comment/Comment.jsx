import React, { Component } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import API from "../../api/apiHandler";
import { buildFormData } from "../utils/buildFormData";

class Comments extends Component {
  state = {
    content: "",
  };

  handlechange = (e) => {
    console.log(this.state.comment);
    const name = e.target.name;
    const key = e.target.value;
    this.setState({
      [name]: key,
    });
  };

  handelSubmit = (e) => {
    e.preventDefault();
    console.log("<<<<<<<==========comment SUBMITTED =====>>>>>");

    const fd = new FormData();
    buildFormData(fd, this.state);

    API.createOne("api/comments", fd)
      .then((apiRes) => console.log(apiRes))
      .catch((err) => console.log(err));
  };

  render() {
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
              src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

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

          <Comment>
            <Comment.Avatar
              alt="avatar"
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea
              onChange={this.handlechange}
              value={this.state.comment}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
        <Form.TextArea onChange={this.handlechange} name="content" id="content" value={this.state.content} />
        <Button
          onSubmit={this.handelSubmit}
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}

export default Comments;
