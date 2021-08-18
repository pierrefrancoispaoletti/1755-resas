import { faBookOpen, faUser } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { logout } from "../../../utils";
import "../../styles/topappbar.css";

const TopAppBar = ({ user, loading, setUser, setMessage }) => {
  return (
    <div className='topappbar'>
      <Link to='/'>
        <div className='topappbar-image'>
          <img src='./images/1755small.png' alt='logo 1755' />
        </div>
      </Link>
      <div className='topappbar-icons'>
        {!user ? (
          <Link to='/login'>
            <Button
              icon
              color={user ? "green" : "grey"}
              circular
              basic
              disabled={loading}
              loading={loading}
            >
              <FontAwesomeIcon size='3x' icon={faUser} />
            </Button>
          </Link>
        ) : (
          <Button
            icon
            color='red'
            circular
            basic
            disabled={loading}
            loading={loading}
            onClick={() => logout(setUser, setMessage)}
          >
            <FontAwesomeIcon size='3x' icon={faUser} />
          </Button>
        )}

        {user === "isAdmin" && (
          <Link to='/bookings'>
            <Button icon circular disabled={loading} loading={loading}>
              <FontAwesomeIcon size='3x' icon={faBookOpen} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;
