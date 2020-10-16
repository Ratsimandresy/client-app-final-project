import React from 'react'
import apiHandler from "../../api/apiHandler";
import { Card, Icon, Image } from 'semantic-ui-react';
import "../../styles/userCard.css";



class UserCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
        }

        // console.log(this.props)

    }
    
    render() {
        const user = { ...this.props.user }
        console.log(user)

        return (
            
            <div id="flex-usercard">
                <Card>
                    <Image src={user.profilImage} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{user.firstName} {user.lastName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{user.pseudo}</span>
                    </Card.Meta>
                    <Card.Description>
                        description : {user.description}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        25 événements créés
                    </a>
                    </Card.Content>
                </Card>
            </div>
        )

    }

}

export default UserCard


