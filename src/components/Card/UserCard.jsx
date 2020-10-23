import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "../../styles/userCard.css";
import { Link } from "react-router-dom";
import Aos from "aos";

class UserCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };

    // console.log(this.props)
  }

  render() {
    const user = { ...this.props.user };
    console.log(user);

    return (
      // <div id="flex-usercard">
      //     <Card>
      //         <Image src={user.profilImage} wrapped ui={false} alt="profil picture" />
      //         <Card.Content>
      //         <Card.Header>{user.firstName} {user.lastName}</Card.Header>
      //         <Card.Meta>
      //             <span className='date'>{user.pseudo}</span>
      //         </Card.Meta>
      //         <Card.Description>
      //             description : {user.description}
      //         </Card.Description>
      //         </Card.Content>
      //         <Card.Content extra>
      //         <Link to={`/all-events`}>25 événements créés</Link>
      //         </Card.Content>
      //     </Card>
      // </div>

      <div data-aos="fade-out" class="profile-card">
        <div class="top-section">
          <i class="message fas fa-envelope"></i>
          <i class="notif fas fa-bell"></i>
          <div class="pic">
            <Image
              src={user.profilImage}
              wrapped
              ui={false}
              alt="profil picture"
            />
          </div>
          <div class="name">{user.firstName}</div>
          <div class="tag">{user.pseudo}</div>
        </div>
        <div class="bottom-section">
          <div class="social-media">
            <Link className="Icon" to="/">
              <Icon name="facebook" />
            </Link>
            <Link className="Icon" to="/">
              <Icon name="twitter" />
            </Link>
            <Link className="Icon" to="/">
              <Icon name="instagram" />
            </Link>
            <Link className="Icon" to={`/all-events`}>
              <Icon name="linkify" />
            </Link>
          </div>
          <div class="videos">
            {user.events.length}
            <span>Post</span>
          </div>
          <div class="border"></div>
          <div class="subscribers">
            3 <span>Friends</span>
          </div>
          <div class="border"></div>
          <div class="views">
            25 <span>Views</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
