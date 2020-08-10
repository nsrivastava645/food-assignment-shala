const express = require(`express`);
const passport = require('passport');
require('../config/passport-local-strategy');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.get('/home', customerController.home);
router.get('/order-page', passport.checkAuthentication, customerController.orderPage);
router.get('/order',passport.checkAuthentication, customerController.order);
router.get('/customer_registration', (req, res)=>{
    res.render('customer_registration');
});

router.get('/customer_login', (req, res)=>{
    res.render('customer_login');
});
router.post('/register', customerController.register);
router.post('/create-session', passport.authenticate('customerStrategy', 
{failureRedirect: '/customer_login'}), customerController.createSession);
router.get('/sign-out', customerController.destroySession);


module.exports = router;