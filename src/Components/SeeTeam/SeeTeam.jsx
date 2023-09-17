import React, { useEffect, useState } from 'react';
import './seeteam.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import empservice from '../services/Employeeservice';

const SeeTeam = () => {
    const [data, setData] = useState([]);
    const loc = useLocation();
    const id = loc.pathname.split("/")[2];
    console.log(id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await empservice.getemployeeById(id);
                if (response) {
                    console.log(response.MyTeam);
                    setData(response.MyTeam);
                } else {
                    alert("No Data Found");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async (teamempId) => {
        console.log(teamempId)
        try {
            await empservice.deleteteam(id, teamempId);
            const newdata = data.filter((x) => x._id !== teamempId);
            setData(newdata);
        } catch (error) {
            console.error(error);
        }
    };

    let sl=1;

    return (
        <div id="container">
            <h2 id="heading">Employee Team Details</h2>
            <Link to={`/addteam/${id}`}><button>Add New Team Member</button></Link>
            <table id="employee-table">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Work</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x) => (
                        <tr key={x._id}>
                            <td>{sl++}</td>
                            <td>{x.name}</td>
                            <td>{x.phone}</td>
                            <td>{x.email}</td>
                            <td>{x.designation}</td>
                            <td>{x.work}</td>
                            <td>
                                <button id="edit-button">
                                    <Link to={`/editteam/${id}/${x._id}`}>
                                        Edit
                                    </Link>
                                </button>
                                <button onClick={() => handleDelete(x._id)} id="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeTeam;
