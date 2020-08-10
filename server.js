const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const foodShalaDB = require('./config/mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport-local-strategy');
const crypto = require('crypto');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(expressLayouts);
app.use(session({
    name: 'foodShala',
    saveUninitialized: false,
    secret: 'secretKey',
    cookie: {
        maxAge: (1000 * 60 * 60 * 24)//equals 1 day
    },
    resave: false,
    store: new MongoStore(
        {
            mongooseConnection : foodShalaDB,
            collection: 'sessions',
        }, 
        function(err){
            console.log(err || 'connect-mongodb setup okay');
        }
        
        )
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
// app.use(customMiddleWare.setFlash);

app.use('/', require('./routes'));

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
})