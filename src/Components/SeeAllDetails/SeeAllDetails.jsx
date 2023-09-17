import React, { useEffect, useState } from 'react';
import './seealldetails.css';
import { Link } from 'react-router-dom';
import empservice from '../services/Employeeservice';

const SeeAllDetails = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await empservice.getemployee();

        if (employees) {
          setData(employees);
          setSearch(employees);
        }
        else {
          console.error("No data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data)

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setSearch(filtered);
  };

  const handleCancle = () => {
    setSearch(data)
    window.location.reload()
  }

  const handleDelete = (index) => {
    empservice.deleteemployee(index);
    const newdata = data.filter((x) => x._id !== index);
    setData(newdata);
  };

  let sl = 1;

  return (
    <div id="container">
      <h2 id="heading">Employee Details</h2>
      <input id='search' type="text" placeholder='Search...' onChange={handleSearch} />
      <span id='cancle' onClick={handleCancle}>X</span>
      <Link to='/details'><button>Add New Employee</button></Link>

      {search.length > 0 ? (
        <table id="employee-table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {search.map((x) => (
              <tr key={x._id}>
                <td>{sl++}</td>
                <td>{x.name}</td>
                <td>{x.phone}</td>
                <td>{x.email}</td>
                <td>{x.designation}</td>
                <td>{x.joining.slice(0,10)}</td>
                <td>{x.salary}</td>
                <td>
                  <Link to={`/edit/${x._id}`} >
                    <button>
                      Edit
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(x._id)} >
                    Delete
                  </button>

                  <Link to={`/empteams/${x._id}`} >
                    <button>
                      See Team
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Match Found...</p>
      )}
    </div>
  );
};

export default SeeAllDetails;
