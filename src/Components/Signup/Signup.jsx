import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import empservice from '../services/Employeeservice'
import passwordlock from './password.png'
import passwordunlock from './password-unlock.png'
const Signup = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPasswd] = useState('')
    let [showpassword, setShowPassword] = useState(false)
    let nameData = (e) => {
        setName(e.target.value)
    }
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

    let sign = async (e) => {
        let payload = { name, email, password }
        // console.log(payload)
        await empservice.signup(payload)
            .then((res) => {
                // console.log(res)
                if (res.status === 200) {
                    alert(res.message)
                    navigate('/login')
                }
                else if (res.status === 409) {
                    alert(res.message)
                    navigate('/login')

                }
                else {
                    alert(res.message)
                    navigate('/')
                }
            })
    }
    return (
        <div id='signup'>
            <div id='signup-form'>
                <h2 id='heading'>Sign-Up Form</h2>

                <span>Name</span>
                <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />

                <span>Password</span>
                <div id='password-contain'>
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
                <button onClick={sign}>Sign-Up</button>
                <button>
                    <Link style={{textDecoration:'none',color:'black'}} to='/hrsignup'>HR-Sign-Up</Link>
                </button>
            </div>
        </div>
    );
};

export default Signup;
