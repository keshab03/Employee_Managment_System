import React, { useState } from 'react'
import './details.css'
import { Link, useNavigate } from 'react-router-dom'
import empservice from '../services/Employeeservice'

const Details = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [hremail, setHrEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [designation, setDesignation] = useState('')
    let [joining, setJoining] = useState('')
    let [salary, setSalary] = useState('')
    let navigate = useNavigate()

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

    let joinData = (e) => {
        setJoining(e.target.value);
    }

    let salData = (e) => {
        setSalary(e.target.value);
    }

    let hremailData = (e) => {
        setHrEmail(e.target.value);
    }

    let submit = async (e) => {
        let payload = { name, phone, email, designation, joining, salary, hremail }
        console.log(payload)
        await empservice.createemployee(payload)
            .then((res) => {
                console.log(res)
                console.log(res.status)
                if (res.status === 409) {
                    alert(res.message)
                    navigate('/seealldetails')
                } if (res.status === 201) {
                    alert(res.message)
                    navigate('/seealldetails')
                }
            })
    }

    return (
        <div id='adddetails'>
            <div id='adddetails-form'>
                <h3>Add Employee Details</h3>

                <span>Name</span>
                <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />

                <span>Email-Id</span>
                <input type="email" placeholder='Enter Email' value={email} onChange={emailData} />

                <span>Phone Number</span>
                <input type="number" placeholder='Enter Phone No.' value={phone} onChange={phoneData} />

                <span>Designation</span>
                <input type="text" placeholder='Enter Designation' value={designation} onChange={desigData} />

                <span>Joining Date</span>
                <input type="date" placeholder='Enter Joining Date' value={joining} onChange={joinData} />

                <span>Salary</span>
                <input type="number" placeholder='Enter Salary' value={salary} onChange={salData} />

                <span>Hr Email</span>
                <input type="email" placeholder="Enter Hr's Email" value={hremail} onChange={hremailData} />

                <div id='btn'>
                    <button onClick={submit}>Submit</button>
                    <button>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/seealldetails'>Go To See Details</Link>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Details
