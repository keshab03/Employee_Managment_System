import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import empservice from '../services/Employeeservice';
import passwordlock from './password.png';
import passwordunlock from './password-unlock.png';
import SuccessModal from '../SuccessModal';

const Signup = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPasswd] = useState('');
    let [showpassword, setShowPassword] = useState(false);
    let [modalMessage, setModalMessage] = useState('');
    let [showModal, setShowModal] = useState(false);
    let [nameerrortext, setNAmeErrorText] = useState('')
    let [emailerrortext, setEmailErrorText] = useState('')
    let [passworderrortext, setPasswordErrorText] = useState('')
    let nameData = (e) => {
        setName(e.target.value);
    };
    let emailData = (e) => {
        setEmail(e.target.value);
    };
    let passData = (e) => {
        setPasswd(e.target.value);
    };
    let showpass = () => {
        setShowPassword(!showpassword);
    };

    let navigate = useNavigate();

    let sign = async (e) => {
        if (!name) {
            setNAmeErrorText("please fill the name")
            return
        } else {
            setNAmeErrorText('')
        } if (!email) {
            setEmailErrorText("please fill the email")
            return
        } else {
            setEmailErrorText('')
        } if (!password) {
            setPasswordErrorText("please fill the password")
            return
        } else {
            setPasswordErrorText('')
        }
        if (password.length >= 8) {
            let payload = { name, email, password };
            await empservice.signup(payload)
                .then((res) => {
                    if (res.status === 200) {
                        setModalMessage(res.message);
                        setShowModal(true);
                    } else if (res.status === 409) {
                        setModalMessage(res.message);
                        setShowModal(true);
                    } else {
                        setModalMessage(res.message);
                        setShowModal(true);
                        navigate('/');
                    }
                });
        } else {
            setPasswordErrorText("please enter 8 character")
        }

    };

    let handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div id='signup'>
            <div id='signup-form' className={showModal ? 'blur' : ''}>
                <h2 id='heading'>Sign-Up Form</h2>

                <span>Name</span>
                <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />
                <p style={{ color: 'red' }}>{nameerrortext}</p>
                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />
                <p style={{ color: 'red' }}>{emailerrortext}</p>
                <span>Password</span>
                <div id='password-contain'>
                    <input
                        type={showpassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        value={password}
                        onChange={passData}
                    />
                    <p style={{ color: 'red' }}>{passworderrortext}</p>
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
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/hrsignup'>HR-Sign-Up</Link>
                </button>
            </div>

            {showModal && (
                <SuccessModal
                    message={modalMessage}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Signup;
