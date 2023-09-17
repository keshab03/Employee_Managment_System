import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
  return (
    <div id='welcome'>
      <form id='welcome-form'>
        <h1 id="title">Welcome to E.M.S.</h1>
        <h2>New User Click Here <br /> 👇</h2>
        <Link to="/signup"><button>Sign-Up</button></Link>
        <br /> <br />
        <hr />
        <h2>Already Have An Account? <br/> Click Here 👇</h2>
        <Link to="/login"><button>Log-In</button></Link>
      </form>
    </div>
  );
}

export default Welcome;
