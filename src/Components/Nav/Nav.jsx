import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import icon from './profile-icon.png';
import empservice from '../services/Employeeservice';
import logo from './kmLogo.jpg'

const Nav = () => {
  const [data, setData] = useState([])
  const [showLogoutButton, setShowLogoutButton] = useState('')

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await empservice.getallemployee();
        if (response && response.length > 0) {
          console.log("Getting for Nav", response);
          setData(response);
        } else {
          console.log('No Employee Details Found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    const emailInLocalStorage = localStorage.getItem('email');
    const idInLocalStorage = localStorage.getItem('id');
    setShowLogoutButton(emailInLocalStorage && idInLocalStorage);
  }, []);

  let logout = () => {
    let confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.clear();
      window.location.href = '/';
    }
  }

  return (
    <div id='nav'>
      <Link to='/'>
        <img src={logo} alt="" />
      </Link>
      <h1>Employee Management</h1>
      {showLogoutButton && (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <img src={icon} alt="" />
        <p style={{ fontWeight: 'bolder' }}>E:- {data.length}</p>
      </div>
    </div>
  );
};

export default Nav;
