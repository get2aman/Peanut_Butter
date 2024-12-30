const mongoose = require('mongoose');
// Define User Schema
const AdminSchema = new mongoose.Schema({
    username: {
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
});
// Create and export the User model
const AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;
