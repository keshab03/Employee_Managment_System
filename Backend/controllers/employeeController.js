const Employee = require('../models/Employee');
const SignUp = require('../models/Signup')
const HrSignup = require('../models/Hr')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
// Get all employees For Hr's
const getAll = async (req, res) => {

    try {
        const userData = await HrSignup.find({ id: req.body.id });
        // console.log(userData)
        const employee = await Employee.find().sort({ createdAt: -1 });
        res.send({ employee, status: 200, userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllEmployee = async (req, res) => {

    try {
        const employee = await Employee.find();
        // console.log(employee)
        res.send({ employee, status: 200 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const getteam = async (req, res) => {

//     try {
//         const employee = await Employee.find().sort({ createdAt: -1 });
//         const MyTeam = (employee[0].MyTeam)
//         res.status(200).json({ MyTeam });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// Get an employee by ID
const getById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        // console.log(employee)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get the team of an employee by ID
const getEmpTeamById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        // console.log(employee)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTeamById = async (req, res) => {
    try {
        const { employeeId, teamMemberId } = req.params;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const teamMember = employee.MyTeam.find(member => member._id.toString() === teamMemberId);
        // console.log(teamMember)
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json({ teamMember, status: 200, id: employeeId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new employee
const createemployee = async (req, res) => {
    try {
        const { name, phone, email, designation, joining, salary, hremail } = req.body;
        const imageUrl = req.file;
        const userData = await Employee.findOne({ email: req.body.email });
        if (userData) {
            res.json({ message: "User Already Exists", status: 409 });
        }
        else {
            const employee = new Employee({ name, phone, email, designation, joining, salary, hremail, imageUrl });
            await employee.save();
            res.send({ message: 'Employee created successfully', status: 201 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createteam = async (req, res) => {
    try {
        const id = req.params.employeeId;
        const { name, phone, email, designation, work } = req.body;
        const imageUrl = req.file;

        const employee = await Employee.findById(id);
        // console.log(employee)
        if (!employee) {
            return res.send({ message: 'Employee not found', status: 404 });
        }

        const isTeamMemberPresent = employee.MyTeam.find(member => member.email === email);
        // console.log(isTeamMemberPresent);
        if (isTeamMemberPresent) {
            return res.send({ message: 'Team member already present', status: 400 });
        }
        // else{
        //     res.send({message: "You Don't Have The Access", status: 400 })
        // }

        employee.MyTeam.push({
            name,
            phone,
            email,
            designation,
            work,
            imageUrl
        });

        await employee.save();

        return res.send({
            message: 'Team data added to employee successfully', employee: employee, status: 201
        });
    } catch (error) {
        console.error(error);
        return res.send({ message: 'Internal server error', status: 500 });
    }
};





const signup = async (req, res) => {
    try {
        const userData = await SignUp.findOne({ email: req.body.email });

        if (userData) {
            res.json({ message: '' + userData.email + ' Already Exists', status: 409 });
        } else {
            const { name, email, password } = req.body;


            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const employeesignup = new SignUp({ name, email, password: hashedPassword });
            const userdata = await employeesignup.save();
            sendmail(name, email, userdata._id);

            res.send({ message: 'Hi ' + name + ' you have signed-up successfully please check your mail for verification', status: 200 });
        }
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error while signup', status: 500 });
    }
};
const sendmail = async (name, email, userId) => {

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Hi ${name}, click here to <a href="http://localhost:5500/emp/verify?id=${userId}">verify your account</a></p>`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error occurred', err);
            }
            console.log('Message sent successfully', info);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const verifyEmail = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.send({ message: 'Invalid verification link', status: 400 });

        }

        // Fetch the user data from the database
        const user = await SignUp.findById(req.query.id);

        if (!user) {
            return res.send({ message: 'User not found', status: 404 });

        }

        if (user.verified) {
            return res.send({ message: 'User already verified', status: 200 });

        }

        // Update the user's verification status
        await SignUp.updateOne({ _id: req.query.id }, { $set: { verified: true } });


        return res.send({ message: 'Verification Successful', status: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while verification' });
    }
}


const hrsignup = async (req, res) => {
    try {
        const userData = await HrSignup.findOne({ email: req.body.email });

        if (userData) {
            res.json({ message: '' + userData.email + ' Already Exists', status: 409 });
        } else {
            const { name, email, password } = req.body;

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            const hrsignup = new HrSignup({ name, email, password: hashedPassword });
            const userdata = await hrsignup.save();
            sendHrMail(name, email, userdata._id);
            res.send({ message: 'Hi ' + name + ' you have signed-up successfully please check your mail for verification', status: 200 });
        }
    } catch (error) {
        console.error(error);
        res.send({ message: 'Internal server error while signup', status: 500 });
    }
};

const sendHrMail = async (name, email, userId) => {

    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Hi ${name}, click here to <a href="http://localhost:5500/emp/verifyhr?id=${userId}">verify your account</a></p>`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('Error occurred', err);
            }
            console.log('Message sent successfully', info);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const verifyHrEmail = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.send({ message: 'Invalid verification link', status: 400 });

        }

        // Fetch the user data from the database
        const user = await HrSignup.findById(req.query.id);

        if (!user) {
            return res.send({ message: 'User not found', status: 404 });

        }
        if (user.verified) {
            return res.send({ message: 'User already verified', status: 200 });

        }

        // Update the user's verification status
        await HrSignup.updateOne({ _id: req.query.id }, { $set: { verified: true } });


        return res.send({ message: 'Verification Successful', status: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while verification' });
    }
}

const login = async (req, res) => {
    try {
        const userData = await SignUp.findOne({ email: req.body.email });
        // console.log(userData)
        const userData1 = await Employee.findOne({ email: req.body.email });

        if (userData) {
            const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
            if (!userData.verified) {
                return res.send({ message: 'Please verify your email', status: 310 });
            }
            else if (isPasswordValid && userData1 !== null && req.body.email === userData1.email) {
                return res.send({ message: 'LogIn Successful And Details Already Added', status: 200, id: userData1._id, email: userData1.email });
            } else if (isPasswordValid && req.body.email === userData.email && userData1 === null) {
                return res.send({ message: 'Successful Logged In But Details Not Added. Contact HR.', status: 201 });
            }
            else if (!isPasswordValid) {
                return res.send({ message: 'Please enter a valid password', status: 401 });
            }
        } else {
            return res.send({ message: 'User not found', status: 404 });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error while login' });
    }
};


const hrlogin = async (req, res) => {
    try {
        const userData = await HrSignup.findOne({ email: req.body.email });

        if (userData) {
            const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
            if (!userData.verified) {
                return res.send({ message: 'Please verify your email', status: 310 });
            }
            else if (isPasswordValid) {
                res.send({ message: 'Hi HR ' + userData.name + ' you have LogedIn Successful', status: 200, id: userData._id, email: userData.email });
            } else {
                res.send({ message: 'Please enter a valid password', status: 401 });
            }
        } else {
            res.send({ message: 'User not found', status: 404 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error while login' });
    }
};



// Update an employee by ID
const updateById = async (req, res) => {
    try {
        const { name, phone, email, designation, joining, salary, hremail } = req.body;
        const imageUrl = req.file;
        const employeeUpdate = {
            name, phone, email, designation, joining, salary, hremail, imageUrl
        };

        const employee = await Employee.findByIdAndUpdate(req.params.id, employeeUpdate, { new: true });
        //    console.log(employee)
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTeamById = async (req, res) => {
    try {
        const { employeeId, teamMemberId } = req.params;
        const { name, phone, email, designation, work } = req.body;
        const imageUrl = req.file;

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const teamMemberIndex = employee.MyTeam.findIndex(member => member._id.toString() === teamMemberId);

        if (teamMemberIndex === -1) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        const teamMember = employee.MyTeam[teamMemberIndex];
        teamMember.name = name;
        teamMember.phone = phone;
        teamMember.email = email;
        teamMember.designation = designation;
        teamMember.work = work;
        teamMember.imageUrl = imageUrl;

        await employee.save();

        res.status(200).json({ message: 'Team member updated successfully', teamMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Delete an employee by ID
const deleteById = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteTeamById = async (req, res) => {
    try {
        const { employeeId, teamMemberId } = req.params;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Find the index of the team member in the MyTeam array
        const teamMemberIndex = employee.MyTeam.findIndex(member => member._id.toString() === teamMemberId);

        if (teamMemberIndex === -1) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Remove the team member from the MyTeam array
        employee.MyTeam.splice(teamMemberIndex, 1);

        // Save the updated employee document
        await employee.save();

        res.status(200).json({ message: 'Team member deleted successfully', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { getAll, getAllEmployee, getById, createemployee, updateById, deleteById, signup, login, hrsignup, hrlogin, createteam, deleteTeamById, getTeamById, updateTeamById, getEmpTeamById, verifyHrEmail, verifyEmail }