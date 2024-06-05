import React, { useState } from 'react'
import './hrlogin.css'
import { useNavigate } from 'react-router-dom'
import empservice from '../services/Employeeservice'
import passwordlock from './password.png'
import passwordunlock from './password-unlock.png'
import SuccessModal from '../SuccessModal';

const HrLogin = () => {
    let [email, setEmail] = useState('')
    let [password, setPasswd] = useState('')
    let [showpassword, setShowPassword] = useState(false)
    let [modalMessage, setModalMessage] = useState('');
    let [showModal, setShowModal] = useState(false);

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
        // e.preventDefault()
        let payload = { email, password };
        console.log(payload)
        try {
            await empservice.hrlogin(payload)
                .then((res) => {
                    console.log('Response from server:', res.status); // Add this line for debugging
                    if (res.status === 200) {
                        setModalMessage(res.message);
                        setShowModal(true);
                    }
                    else {
                        setModalMessage(res.message);
                        setShowModal(true);
                        navigate('/');
                    }
                });
        } catch (error) {
            console.error('Error during login:', error); // Add this line for debugging
            // Handle the error appropriately if necessary
        }
    };
    let handleCloseModal = () => {
        setShowModal(false);
        navigate('/details');
        window.location.reload()
    };

    return (
        <div id='hrlogin'>
            <div id='hrlogin-form' className={showModal ? 'blur' : ''}>


                <h2 id='heading'>Hr Login Form</h2>

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />

                <span>Password</span>
                <div id='hrlpassword-container'>
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
            </div>
            {showModal && (
                <SuccessModal
                    message={modalMessage}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}
export default HrLogin