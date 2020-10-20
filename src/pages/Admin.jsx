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
} from "semantic-ui-react";

class Admin extends Component {
  state = {
    data: [],
    activeIndex: 0,
    categories: null,
  };

  componentDidMount() {
    apiHandler
      .getAll("/api/admin/categories")
      .then((apiRes) => {
        this.setState({ categories: apiRes });
        console.log(this.state.categories);
      })
      .catch((apiErr) => {
        console.log(apiErr);
      });
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
        const newCategoriesArray = categoriesArray.filter(item => item._id !== categoryId)
        console.log(newCategoriesArray)

        this.setState({ categories: newCategoriesArray });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  };

  render() {
    if (!this.state.categories) {
      return <div>Loading the categories</div>;
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
        </Accordion>
      </div>
    );
  }
}

export default Admin;
