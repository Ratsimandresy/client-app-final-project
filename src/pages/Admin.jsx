import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import "../styles/admin.css";
import {
  Accordion,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Radio,
  Table,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";

class Admin extends Component {
  state = {
    data: [],
    activeIndex: 0,
    categories: null,
    tags: null,
  };

  //   componentDidMount() {
  //     apiHandler
  //       .getAll("/api/admin/categories")
  //       .then((apiRes) => {
  //         this.setState({ categories: apiRes });
  //         console.log(this.state.categories);
  //       })
  //       .catch((apiErr) => {
  //         console.log(apiErr);
  //       });
  //   }

  async componentDidMount() {
    try {
      const categoriesApi = await apiHandler.getAll("/api/admin/categories");
      const tagsApi = await apiHandler.getAll("/api/admin/tags");

      this.setState({ categories: categoriesApi, tags: tagsApi });
      console.log(this.state);
    } 
    catch (errApi) {
      console.log(errApi);
    }
  }

  handleClickAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleDelete = (event, categoryId) => {
    const categoriesArray = this.state.categories;
    console.log(categoriesArray);
    apiHandler
      .deleteone(`/api/admin/categories/${categoryId}`)
      .then((apiRes) => {
        const newCategoriesArray = categoriesArray.filter(
          (item) => item._id !== categoryId
        );
        console.log(newCategoriesArray);

        this.setState({ categories: newCategoriesArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  handleDeleteTag = (event, tagId) => {
    const tagsArray = this.state.tags;
    console.log(tagsArray);
    apiHandler
      .deleteone(`/api/admin/tags/${tagId}`)
      .then((apiRes) => {
        const newTagsArray = tagsArray.filter(
          (item) => item._id !== tagId
        );
        console.log(newTagsArray);

        this.setState({ tags: newTagsArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  render() {
    if (!this.state.categories) {
      return (
        <div>
          {" "}
          <Loader active inline="centered" />{" "}
        </div>
      );
    }
    return (
      <div>
        <h1 className="page page-admin">Page Admin</h1>
        <Accordion styled>
          <Accordion.Title
            active={this.state.activeIndex === 0}
            index={0}
            onClick={this.handleClickAccordion}
          >
            <Icon name="dropdown" />
            Catégories
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 0}>
            <Link to="Admin/category-create">
              <Button color="teal" fluid size="large">
                Créer une nouvelle catégorie
              </Button>
            </Link>

            <Table fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Label</Table.HeaderCell>
                  <Table.HeaderCell>Modifier</Table.HeaderCell>
                  <Table.HeaderCell>Supprimer</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.categories.map((category) => (
                  <Table.Row key={category.label}>
                    <Table.Cell>
                      {" "}
                      <p>{category.label}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`Admin/category-edit/${category._id}`}>
                        <button>
                          <Icon name="edit" />
                        </button>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={(e) => {
                          this.handleDelete(e, category._id);
                        }}
                      >
                        <Icon disabled name="trash" />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Accordion.Content>
          <Accordion.Title
            active={this.state.activeIndex === 1}
            index={1}
            onClick={this.handleClickAccordion}
          >
            <Icon name="dropdown" />
            Tags
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 1}>
            <Link to="Admin/tag-create">
              <Button color="teal" fluid size="large">
                Créer un nouveau tag
              </Button>
            </Link>

            <Table fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Label</Table.HeaderCell>
                  <Table.HeaderCell>Modifier</Table.HeaderCell>
                  <Table.HeaderCell>Supprimer</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.tags.map((tag) => (
                  <Table.Row key={tag.label}>
                    <Table.Cell>
                      {" "}
                      <p>{tag.label}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`Admin/tag-edit/${tag._id}`}>
                        <button>
                          <Icon name="edit" />
                        </button>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={(e) => {
                          this.handleDeleteTag(e, tag._id);
                        }}
                      >
                        <Icon disabled name="trash" />
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default Admin;
