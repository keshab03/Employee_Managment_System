import React, { useEffect, useState } from 'react';
import './empteams.css';
import empservice from '../services/Employeeservice';
import { useParams } from 'react-router-dom';

const EmpTeams = () => {
    const [data, setData] = useState([]);
    let { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employees = await empservice.getempteamById(id);
                console.log("For Hr email", employees)
                console.log("New ADDED", employees.MyTeam)

                if (employees) {
                    setData(employees.MyTeam);
                } else {
                    alert("No data found");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);



    let sl = 1;

    return (
        <div id="container">
            {data.length > 0 ? (
                <table id="employee-table">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Designation</th>
                            <th>Work</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((x) => (
                                <tr key={x._id}>
                                    <td>{sl++}</td>
                                    <td style={{ background: 'none', padding: '0px' }}>
                                        <img src={`https://employee-managment-system-2.onrender.com/${x.imageUrl[0].path}`} alt="" />
                                    </td>
                                    <td>{x.name}</td>
                                    <td>{x.email}</td>
                                    <td>{x.phone}</td>
                                    <td>{x.designation}</td>
                                    <td>{x.work}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            ) : (
                <p>No Data Found...</p>
            )}
        </div>
    );
};

export default EmpTeams;
