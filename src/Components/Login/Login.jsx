import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import empservice from '../services/Employeeservice'
import passwordlock from './password.png'
import passwordunlock from './password-unlock.png'
const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPasswd] = useState('')
    let [showpassword, setShowPassword] = useState(false)

    let emailData = (e) => {
        setEmail(e.target.value)
    }
    let passData = (e) => {
        setPasswd(e.target.value)
    }
    let showpass = () => {
        setShowPassword(!showpassword);
    }
    let navigate = useNavigate()

    let login = async (e) => {
        e.preventDefault();
        let payload = { email, password };
        console.log(payload);
        try {
            const response = await empservice.login(payload);
            console.log('Response from server:', response.status);

            if (response.status === 200) {
                alert(response.message);
                navigate(`/addteam/${response.id}`);
                window.location.reload()
            } else if (response.status === 201) {
                alert(response.message);
                navigate('/');
            } else if (response.status === 401) {
                alert(response.message);
                // Handle unauthorized access if needed
            } else if (response.status === 404) {
                alert(response.message);
                // Handle user not found if needed
            } else {
                alert(response.message);
                // Handle other cases if needed
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle the error appropriately if necessary
        }
    };



    return (
        <div id='login'>
            <div id='login-form'>

                <h2 id='heading'>Login Form</h2>

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />

                <span>Password</span>
                <div id='emppassword-container'>

                    <input
                        type={showpassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        value={password}
                        onChange={passData}
                    />
                    <button onClick={showpass}>
                        {showpassword ? (
                            <img src={passwordunlock} alt="" />
                        ) : (
                            <img src={passwordlock} alt="" />
                        )}
                    </button>
                </div>

                <button onClick={login}>Login</button>
                <button>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/hrlogin'>HR Login</Link>
                </button>

            </div>
        </div>
    )
}
export default Login