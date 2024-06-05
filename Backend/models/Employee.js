const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    joining: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    hremail: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: Array,
        required: true,
    },
    MyTeam: [teamSchema]  // Nest the teamSchema inside employeeSchema as an array
}, { timestamps: true });

const Employee = mongoose.model('EmployeeDetails', employeeSchema);

module.exports = Employee;
