const mongoose = require('mongoose');

const restuarantSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        userType : {
            type: Number,
            default: 0,//for restuarant
            required: true
        },
        ordersList: [{type: mongoose.Types.ObjectId, ref:'Order', required: true}],
        menuItems: [{type: mongoose.Types.ObjectId, required: true, ref:'Item'}]
        



    },
    {timestamps: true}
);

const Restuarant = mongoose.model('Restuarant', restuarantSchema);

module.exports = Restuarant;