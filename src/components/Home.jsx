// import React from 'react';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrganizationTree from './Orgtree';
import UserList from './ListUsers';
// import SampleTree from "./Sample";

const Home = () => {
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
      axios.get('https://hhbackend.vercel.app/authonticate', {
        headers: {
          Authorization: `${token}`
        }
      })
        .then(response => {
          setUser(response.data.user);
          setLogoutTimer();
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

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
    axios.post('https://hhbackend.vercel.app/logout')
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
    <div >
      {/* Banner */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/home">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">Home <span className="sr-only"></span></a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" ></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>

          {/* Profile and Logout buttons in collapsed menu */}
          <ul className="navbar-nav ml-auto d-lg-none">
            <li className="nav-item">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleProfile}>Profile</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Main Content */}
      <div>
                    <div>
                        {user ? (
                            <>
                            {/* <SampleTree/> */}
                                <h3 className="text-center p-5">Welcome to Helping Hands  <span className="text-success">{user.name}</span>!</h3>
                                <OrganizationTree />
                                <div>
                                              {
                                                user.email=='sri@gmail.com'?(<><UserList /></>):(<></>)
                                              }
                                </div>
                            </>
                        ) : (
                            <p>No user logged in. Please login first.</p>
                        )}
                    </div>
                    
               
            </div>
            
            
    </div>
  )
}

export default Home