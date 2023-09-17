import React, { useEffect, useState } from 'react';
import './edit.css';
import { useNavigate, useLocation } from 'react-router-dom';
import empservice from '../services/Employeeservice'

const Edit = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [hremail, setHrEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [designation, setDesignation] = useState('')
    let [joining, setJoining] = useState('')
    let [salary, setSalary] = useState('')
    let navigate = useNavigate()

    const loc = useLocation();
    const id = loc.pathname.split("/")[2]
    console.log(id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await empservice.getemployeeById(id);
                const employeeData = response;
                // console.log("To Edit",response)

                if (employeeData) {
                    setName(employeeData.name);
                    setEmail(employeeData.email)
                    setHrEmail(employeeData.hremail)
                    setPhone(employeeData.phone);
                    setDesignation(employeeData.designation);
                    setJoining(employeeData.joining);
                    setSalary(employeeData.salary);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

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
    let update = (e) => {
        e.preventDefault();
        let payload = { name, phone, email, designation, joining, salary, hremail };
        empservice.updateemployee(payload, id)
            .then(() => {
                navigate('/seealldetails');
            });
    };

    return (
        <div id='edit'>
            <form id='editemp-form'>
                <h2 id='heading'>Employee Details</h2>
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
                <br />
                <button onClick={update}>Update</button>
            </form>
        </div>
    );
};

export default Edit;
