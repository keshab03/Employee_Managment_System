import React, { useEffect, useState } from 'react';
import './edit.css';
import { useNavigate, useLocation } from 'react-router-dom';
import empservice from '../services/Employeeservice';

const Edit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [hremail, setHrEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [joining, setJoining] = useState('');
    const [salary, setSalary] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('No file chosen');
    const navigate = useNavigate();

    const loc = useLocation();
    const id = loc.pathname.split("/")[2];
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await empservice.getemployeeById(id);
                const employeeData = response;

                if (employeeData) {
                    const joiningDate = new Date(employeeData.joining);
                    const day = String(joiningDate.getDate()).padStart(2, '0');
                    const month = String(joiningDate.getMonth() + 1).padStart(2, '0');
                    const year = joiningDate.getFullYear();
                    const formattedDateForInput = `${year}-${month}-${day}`;

                    setName(employeeData.name);
                    setEmail(employeeData.email);
                    setHrEmail(employeeData.hremail);
                    setPhone(employeeData.phone);
                    setDesignation(employeeData.designation);
                    setJoining(formattedDateForInput);
                    setSalary(employeeData.salary);

                    setImage(employeeData.imageUrl[0].path);
                    setImageName(employeeData.imageUrl[0].originalname);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const nameData = (e) => {
        setName(e.target.value);
    };

    const emailData = (e) => {
        setEmail(e.target.value);
    };

    const phoneData = (e) => {
        setPhone(e.target.value);
    };

    const desigData = (e) => {
        setDesignation(e.target.value);
    };

    const joinData = (e) => {
        setJoining(e.target.value);
    };

    const salData = (e) => {
        setSalary(e.target.value);
    };

    const hremailData = (e) => {
        setHrEmail(e.target.value);
    };

    const imgData = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageName(file ? file.name : 'No file chosen');
    };

    const update = (e) => {
        e.preventDefault();
        // const payload = { name, phone, email, designation, joining, salary, hremail };

        const formData = new FormData();

        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('designation', designation)
        formData.append('joining', joining)
        formData.append('salary', salary)
        formData.append('hremail', hremail)
        formData.append('image', image)

        empservice.updateemployee(formData, id)
            .then(() => {
                navigate('/seealldetails');
            });
    };

    return (
        <div id='edit'>
            <form id='editemp-form'>
                <h2 id='heading' style={{ margin: '0px' }}>Employee Details</h2>
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

                <div className="file-input-container">
                    <input type="file" id="file" onChange={imgData} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                    <label htmlFor="file" className="file-input-label">
                        Choose File
                    </label>
                    <p className="file-input-name">{imageName}</p>
                </div>
                <br />
                <button onClick={update}>Update</button>
            </form>
        </div>
    );
};

export default Edit;
