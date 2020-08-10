const express = require(`express`);
const router = express.Router();
const passport = require('passport');
const restuarantController = require('../controllers/restuarantController');

router.get('/home',passport.checkAuthentication, restuarantController.home);

router.get('/restuarant_registration', (req, res)=>{
    res.render('restuarant_registration');
});
router.get('/restuarant_login', (req, res)=>{
    res.render('restuarant_login');
});

// router.get('/view-orders',passport.checkAuthentication, restuarantController.viewOrders);
router.get('/view-orders/:id',passport.checkAuthentication, restuarantController.viewOrders);

router.get('/addItemsPage', passport.checkAuthentication,  restuarantController.addItemsPage);

router.post('/add-item/:id', passport.checkAuthentication, restuarantController.addItem);

router.get('/order',passport.checkAuthentication, restuarantController.order );

router.get('/view-menu/:id', passport.checkAuthentication, restuarantController.viewMenuItems);

router.post('/register', restuarantController.register);
router.post('/create-session', passport.authenticate('restuarantStratey', 
{failureRedirect: '/restuarant/restuarant_login'}), restuarantController.createSession);
router.get('/sign-out', restuarantController.destroySession);
module.exports = router;