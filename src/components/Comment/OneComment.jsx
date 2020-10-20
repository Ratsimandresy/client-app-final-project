import React, { Component } from "react";
import { Comment, Form, Icon, Button } from "semantic-ui-react";

class OneComment extends Component {
  state = {
    content: "",
    text: "",
  };

  handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = () => {
    console.log("SUBMITTED!!!!!!");
    const { content } = this.state;
    this.setState({ text: content, content: "" });
  };

  render() {
    console.log(this.props);
    return (
      <Form.Group>
        <Comment.Group>
          <Comment>
            <Comment.Avatar
              alt="avatar"
              as="a"
              src="/images/avatar/small/stevie.jpg"
            />
            <Comment.Content>
              <Comment.Author>{this.props.currentUser}</Comment.Author>
              <Comment.Metadata>
                <div>few minutes ago</div>
                <div>
                  <Icon name="star" />5 Faves
                </div>
              </Comment.Metadata>
              <Comment.Text>
                <p>{this.state.text}</p>
              </Comment.Text>
              <textarea
                value={this.state.content}
                name="content"
                onChange={this.handleChange}
              />
            </Comment.Content>
          </Comment>
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={this.handleSubmit}
          />
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Comment.Group>
      </Form.Group>
    );
  }
}
export default OneComment;
