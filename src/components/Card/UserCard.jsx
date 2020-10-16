import React from 'react'
import { Card, Image } from 'semantic-ui-react';
import "../../styles/userCard.css";
import { Link } from 'react-router-dom';



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
                    <Image src={user.profilImage} wrapped ui={false} alt="profil picture" />
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
                    <Link to={`/all-events`}>25 événements créés</Link>
                    </Card.Content>
                </Card>
            </div>
        )

    }

}

export default UserCard


