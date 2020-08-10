const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://foodshala:foodshala@123@cluster0.yd4jt.mongodb.net/foodShala?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

const foodShalaDB = mongoose.connection;

foodShalaDB.on('error', console.error.bind(console, 'Error in connecting to the database'));

foodShalaDB.once(`open`, ()=>{
    console.log(`connected to foodShalaDB via MongoDB`);
});

module.exports = foodShalaDB;