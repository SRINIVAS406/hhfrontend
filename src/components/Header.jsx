// Header.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './images/hhlogo.svg'


const Header = ({onUserUpdate}) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Timer variables
  let logoutTimer;
  let timerInterval;
  const logoutTimeout = 60 * 30 * 1000; // 30 seconds in milliseconds
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

    if (token) {
      axios.get(hostUrl+'/authonticate', {
        headers: {
          Authorization: `${token}`
        }
      })
        .then(response => {
          if (onUserUpdate) {
            onUserUpdate(response.data.user);
          }
          setLogoutTimer();
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate, onUserUpdate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      logoutsession();
    }
  };

  const handleProfile = () => {
    navigate('/profile')
  };

  const logoutsession = () => {
    axios.post(hostUrl+'/logout')
      .then(response => {
        console.log(response.data.message);
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch(error => console.error('Logout failed:', error));
  };


  const setLogoutTimer = () => {
    logoutTimer = setTimeout(() => {
      console.log('hi1');
      clearTimeout(logoutTimer);
      logoutsession();
    }, logoutTimeout);
  };
  return (
    <header>
      {/* Banner */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/home "><img width="50" height="50" src={logo}></img></a>

      <div className="navbar-nav mr-auto">
        {/* <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a> */}
      </div>

      <div className="navbar-nav d-flex flex-row">
        <a className="btn btn-outline-success my-2 my-sm-0" href="#" onClick={handleProfile}>Profile</a>
        <a className="btn btn-outline-success my-2 my-sm-0 ml-2" href="#" onClick={handleLogout}>Logout</a>
      </div>
    </nav>
    </header>
  );
};

export default Header;
