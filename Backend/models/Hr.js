const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // verified: {
    //     type: Boolean,
    //     default: false,
    // }
}, { timestamps: true });
const Employee = mongoose.model('HrDetails', hrSchema);
module.exports = Employee;

