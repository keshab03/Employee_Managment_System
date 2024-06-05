import React, { useState } from 'react'
import './addteam.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import empservice from '../services/Employeeservice'
import './addteam.css'

const AddTeam = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [designation, setDesignation] = useState('')
    let [work, setWork] = useState('')
    let [image, setImage] = useState('')

    let navigate = useNavigate()

    const loc = useLocation();
    const id = loc.pathname.split("/")[2]
    console.log(id)

    let nameData = (e) => {
        setName(e.target.value)
    }

    let emailData = (e) => {
        setEmail(e.target.value)
    }

    let phoneData = (e) => {
        setPhone(e.target.value);
    }

    let desigData = (e) => {
        setDesignation(e.target.value);
    }

    let workData = (e) => {
        setWork(e.target.value);
    }

    let imgData = (e) => {
        setImage(e.target.files[0]);
    }

    let submit = async (e) => {
        // const payload = { name, phone, email, designation, work };

        const formData = new FormData();

        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('designation', designation)
        formData.append('work', work)
        formData.append('image', image)

        console.log(formData)
        await empservice.createteam(formData, id)
            .then((res) => {
                console.log(res)
                if (res.status === 404) {
                    alert(res.message)
                    navigate('/login')
                }
                if (res.status === 400) {
                    alert(res.message)
                    navigate(`/seeteam/${id}`);
                } if (res.status === 201) {
                    alert(res.message)
                    navigate(`/seeteam/${id}`);
                } if (res.status === 403) {
                    alert(res.message)
                    navigate('/')
                }
            })
    }

    return (
        <div id='team'>
            <div id='details-form'>
                <h2 id='heading'>Add Team Member Details</h2>

                <span>Name</span>
                <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />

                <span>Phone Number</span>
                <input type="number" placeholder='Enter Phone No.' value={phone} onChange={phoneData} />

                <span>Designation</span>
                <input type="text" placeholder='Enter Designation' value={designation} onChange={desigData} />

                <span>Work</span>
                <input type="text" placeholder='Enter Work' value={work} onChange={workData} />

                <input type="file" onChange={imgData} accept="image/png, image/jpeg" />

                <br />
                <button onClick={submit}>Submit</button>
                <button>
                    <Link to={`/seeteam/${id}`}>Go To Team Details</Link>
                </button>
            </div>
        </div>
    )
}

export default AddTeam
