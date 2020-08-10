const Restuarant = require('../models/Restuarant');
const Item = require('../models/Item');

module.exports.home = async (req, res)=>{
    let itemList = await Item.find({}).populate('restuarant');
        return res.render('home', {items: itemList, user: req.user});
    // let restuarants = await Restuarant.find({});
}
module.exports.order = (req, res)=>{
    return res.redirect('/customer/customer_login');  
}