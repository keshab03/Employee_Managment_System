import React, { useEffect, useState } from 'react';
import './editteam.css';
import { useNavigate, useLocation } from 'react-router-dom';
import empservice from '../services/Employeeservice'

const EditTeam = () => {
    let [name, setName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [designation, setDesignation] = useState('');
    let [work, setWork] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('No file chosen');
    let navigate = useNavigate()

    const loc = useLocation();
    const employeeId = loc.pathname.split("/")[2]
    const teamMemberId = loc.pathname.split("/")[3]
    // console.log(employeeId)
    // console.log(teamMemberId)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamMemberData = await empservice.getteamById(employeeId, teamMemberId);
                console.log("Edit Team", teamMemberData);
            
                if (teamMemberData) {
                    setName(teamMemberData.name);
                    setPhone(teamMemberData.phone);
                    setEmail(teamMemberData.email);
                    setDesignation(teamMemberData.designation);
                    setWork(teamMemberData.work);
                    setImage(teamMemberData.imageUrl[0].path);
                    setImageName(teamMemberData.imageUrl[0].originalname);

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [employeeId, teamMemberId]);



    let nameData = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    let phoneData = (e) => {
        e.preventDefault();
        setPhone(e.target.value);
    };

    let emailData = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    let desigData = (e) => {
        e.preventDefault();
        setDesignation(e.target.value);
    };


    let workData = (e) => {
        e.preventDefault();
        setWork(e.target.value);
    };

    const imgData = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageName(file ? file.name : 'No file chosen');
    };

    let update = async (e) => {
        e.preventDefault();
        // let payload = { name, phone, email, designation, work };
        const formData = new FormData();

        formData.append('name', name)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('designation', designation)
        formData.append('work', work)
        formData.append('image', image)

        try {
            console.log('Updating with employeeId:', employeeId, 'teamMemberId:', teamMemberId);
            await empservice.updateteam(employeeId, teamMemberId, formData);
            navigate(`/seeteam/${employeeId}`);
        } catch (error) {
            console.error(error);
            // Handle error appropriately (display an error message, etc.)
        }
    };



    return (
        <div id='edit-team'>
            <form id='edit-form'>
                <h2 id='heading'>Employee Details</h2>
                <span>Name</span>
                <input type='text' placeholder='Enter Name' value={name} onChange={nameData} />
                <span>Phone Number</span>
                <input type='number' placeholder='Enter Phone No.' value={phone} onChange={phoneData} />

                <span>Email</span>
                <input type='email' placeholder='Enter Joining Date' value={email} onChange={emailData} />

                <span>Designation</span>
                <input type='text' placeholder='Enter Designation' value={designation} onChange={desigData} />


                <span>Work</span>
                <input type='text' placeholder='Enter Salary' value={work} onChange={workData} />

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

export default EditTeam;
