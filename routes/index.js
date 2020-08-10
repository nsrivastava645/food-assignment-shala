const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home );



router.get('/order', homeController.order);


router.use('/restuarant', require('./restuarant'));
router.use('/customer', require('./customer'));


module.exports = router;