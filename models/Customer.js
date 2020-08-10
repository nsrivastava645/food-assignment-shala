const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        password : {
            type: String,
            required: true
        },
        userType : {
            type: Number,
            default: 1,//for customer
            required: true
        },
        isVeg:{
            type: Number,//0 for veg, 1  for non veg, 2 for both
            required: true,
        }



    },{timestamps: true,}
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;