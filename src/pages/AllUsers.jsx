import React from 'react';
import apiHandler from "../api/apiHandler";
import UserCard from "../components/Card/UserCard";
// import "../styles/allUsers.css";
import { Link } from "react-router-dom";
import { Grid, Pagination } from 'semantic-ui-react';


class AllUsers extends React.Component {
    
    state = {
         users: [],
         isLoading: true,
         error: null
    };
    

    componentDidMount()  {
        console.log("all users")
        apiHandler
            .getAll("/api/user")
            .then((apiRes) => {
                console.log(apiRes);
                this.setState({ users: apiRes })
            })
            .catch((apiErr) => {
                console.log(apiErr)
            })
    }

    render() {

        return (
            <>
                <h1 className="page-title">All the users</h1>
                    <div className="page page-all-users">
                    <Grid>
                        <Grid.Row columns={3}>                        
                        {this.state.users.map(user => (
                            <div key={user._id}>
                                <Link to={`/all-users/${user._id}`}>

                                        <Grid.Column>
                                            <UserCard user={user} />
                                        </Grid.Column>
               
                                </Link>
                            </div>
                        ))}
                        </Grid.Row>                        
                    </Grid>
                    <Pagination defaultActivePage={1} totalPages={2} />

                    </div>
            </>

        )

    }
}

export default AllUsers


{/* <Grid>
    <Grid.Row columns={3}>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={4}>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={5}>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid> */}