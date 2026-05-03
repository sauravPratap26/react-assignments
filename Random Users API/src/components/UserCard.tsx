import type { User } from "../types/user";
import "../styles/UserCard.css";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="card">
      <img src={user.picture.large} alt="user" className="avatar" />

      <h2 className="name">
        {user.name.title} {user.name.first} {user.name.last}
      </h2>

      <p className="email">{user.email}</p>

      <div className="info">
        <p>
          <strong>Location:</strong> {user.location.city}, {user.location.state}
          , {user.location.country}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
