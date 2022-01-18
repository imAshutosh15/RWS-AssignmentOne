const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userType: { type: String, enum: ['user', 'admin'], default: 'user' },
    firstName: { type: String, required: [true, 'First Name is Required'] },
    lastName: { type: String, required: [true, 'Last Name is Required'] },
    email: { type: String, required: [true, 'Email is Required'], index: true, unique: true },
    password: { type: String, required: [true, 'Password is Required'] },
    phone: { type: Number, required: [true, 'Phone Number is Required'], index: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female'], required: [true, 'Gender is Required'] },
    sequrityQuestion: { type: String, required: [true, 'Sequrity Question is Required'] },
    answerForSequrity: { type: String, required: [true, 'Answer for Sequrity Question is Required'] },
}, { timestamps: true }
);

const users = mongoose.model('users', userSchema);

module.exports = users;