const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Restuarant = require('../models/Restuarant');
const Customer = require('../models/Customer');


passport.use('restuarantStratey',new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},(req, email, password, done)=>{
        Restuarant.findOne({email: email},(err, user)=>{
            if(err) { return done(err); }
            if(!user || user.password != password){
                return done(null, false);
            }
            return done(null, user);
        });
}
));

passport.use('customerStrategy', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},(req, email, password, done)=>{
    Customer.findOne({email: email},(err, user)=>{
        if(err) { return done(err); }
        if(!user || user.password != password){
            console.log('Error', err);
            return done(null, false);
        }
        return done(null, user);
    });
}));


//serialise and deserialise the user
passport.serializeUser((user, done)=>{
        let userObj = new Object({
            id: user.id,
            userType : user.userType
        })
        done(null, userObj);

    
});

//deserialise
passport.deserializeUser((userObj, done)=>{
    if(userObj.userType === 0){
        Restuarant.findById(userObj.id, (err, user)=>{
            if(err){
                console.log(`error in finding the user`);
                return done(err);
            }
            return done(null, user);
        });
    }
    else{
        Customer.findById(userObj.id, (err, user)=>{
            if(err){
                console.log(`error in finding the user`);
                return done(err);
            }
            return done(null, user);
        });
    }
});


passport.checkAuthentication = (req, res, next)=>{
    //if user is signed in
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
};

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;