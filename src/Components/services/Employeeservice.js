import axios from 'axios';
import { url } from '../../config';

const baseUrl = url;

const Employeeservice = {

    getemployee: async () => {
        try {
            const response = await axios.get(`${baseUrl}/emp/get`);
            const localStorageEmail = localStorage.getItem('email'); // Replace 'email' with your actual key name
            const matchingEmployees = response.data.employee.filter(employee => employee.hremail === localStorageEmail);
            // console.log(matchingEmployees)
            if (matchingEmployees.length > 0) {
                console.log('Getting Employee');
                return matchingEmployees;
            } else {
                console.log("No employee data with matching HR email.");
                return null; // Return null or handle the case where no employees have matching HR email
            }
        } catch (error) {
            console.log(error.response.data.error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error.message);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },


    getallemployee: async () => {
        try {
            const response = await axios.get(`${baseUrl}/emp/getnum`);

            if (response.data.employee.length > 0) {
                console.log('Getting Employee To Show Numbers');
                return response.data.employee;
            } else {
                console.log("No employee data.");
                return null; // Return null or handle the case where no employees are present
            }
        } catch (error) {
            console.log(error.response.data.error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error.message);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },

    //   ########  Getting Team Member By Employee Id #########
    getemployeeById: async (empid) => {
        try {
            const localStorageEmail = localStorage.getItem('email'); // Replace 'Id' with your actual key name
            const response = await axios.get(`${baseUrl}/emp/get/${empid}`);
            // console.log("To compare", response.data.employee.hremail)
            if (response.data.employee.hremail === localStorageEmail) {
                console.log(response.data.employee)
                return response.data.employee;
            } else {
                console.log("IDs do not match.");
            }
        } catch (error) {
            console.log(error);
        }
    },

    getempteamById: async (empid) => {
        try {

            const localStorageEmail = localStorage.getItem('email'); // Replace 'Id' with your actual key name

            // Compare the URL id with the localStorage id
            const response = await axios.get(`${baseUrl}/emp/getempteam/${empid}`);
            if (response.data.employee.hremail === localStorageEmail) {

                // console.log("Getting from frontend", response.data.employee.hremail)
                return response.data.employee;
            } else {
                console.log("IDs do not match.");
            }
        } catch (error) {
            console.log(error);
        }
    },

    // ########## Getting Teams By id To Edit ############ 
    getteamById: async (employeeId, teamMemberId) => {
        try {
            // Get the current path of the URL
            const currentPath = window.location.pathname;

            // Split the path by '/' and get the last segment
            const pathSegments = currentPath.split('/');
            const urlId = pathSegments[pathSegments.length - 2];

            // Fetch the id from localStorage
            const localStorageId = localStorage.getItem('id'); // Replace 'Id' with your actual key name

            // Compare the URL id with the localStorage id
            if (urlId === localStorageId) {
                const response = await axios.get(`${baseUrl}/emp/getteam/${employeeId}/${teamMemberId}`);
                console.log("Fetching to Compare", urlId);
                return response.data.teamMember; // Return the teamMember data
            } else {
                console.log("IDs do not match.");
                // return null; // Return null or handle the case where ids don't match
            }
        } catch (error) {
            console.error(error);
            // return null; // Handle the error case
        }
    },



    createemployee: async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/emp/create`, data);
            if (response.data.status !== 409) {
                console.log('Employee Created');
            }
            console.log(response.data)

            // return response.data.employee._id;
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while adding details");
            }
        }
    },

    createteam: async (data, id) => {
        try {
            // Get the current path of the URL
            const currentPath = window.location.pathname;

            // Split the path by '/' and get the last segment
            const pathSegments = currentPath.split('/');
            const urlId = pathSegments[pathSegments.length - 1];
            let employeeId = localStorage.getItem('id')
            if (urlId === employeeId) {
                const response = await axios.post(`${baseUrl}/emp/createteam/${id}`, data);
                console.log(response)
                return response.data;
            } else {
                localStorage.clear()
                return { message: "You Don't Have The Access", status: 403 };
            }
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error("An error occurred while sending the request");
            }
        }
    },

    signup: async (sdata) => {
        try {
            const response = await axios.post(`${baseUrl}/emp/signup`, sdata);
            console.log("SignUp Responce => ", response)
            console.log('Sign-Up Successfull');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while SignUp");
            }
        }
    },

    hrsignup: async (sdata) => {
        try {
            const response = await axios.post(`${baseUrl}/emp/hrsignup`, sdata);
            console.log('HR-Sign-Up Successfull');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while HR SignUp");
            }
        }
    },

    login: async (ldata) => {
        try {
            const response = await axios.post(`${baseUrl}/emp/login`, ldata);
            console.log(response)
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data.id);
            if (response.data !== 200) {
                console.log('Login Faid')
            } else {
                console.log('Login Successfull');
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while Login");
            }
        }
    },

    hrlogin: async (ldata) => {
        try {
            const response = await axios.post(`${baseUrl}/emp/hrlogin`, ldata);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("email", response.data.email);

            if (response.data.status === 200) {
                console.log('HR Login Successful');
            } else {
                console.log('HR Login Failed');
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong while HR Login");
            }
        }
    },


    updateemployee: async (data, empId) => {
        try {
            const response = await axios.put(`${baseUrl}/emp/update/${empId}`, data);
            console.log('Employee updated');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },

    updateteam: async (employeeId, teamMemberId, data) => {
        try {
            const response = await axios.put(`${baseUrl}/emp/updateteam/${employeeId}/${teamMemberId}`, data);
            console.log('Team updated');
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },


    deleteemployee: async (empId) => {
        try {
            const response = await axios.delete(`${baseUrl}/emp/delete/${empId}`);
            console.log(response.data); // Log the response
            return response.data;
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },

    deleteteam: async (employeeId, teamMemberId) => {
        try {
            const response = await axios.delete(`${baseUrl}/emp/deleteteam/${employeeId}/${teamMemberId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Something went wrong");
            }
        }
    },

}
export default Employeeservice;
