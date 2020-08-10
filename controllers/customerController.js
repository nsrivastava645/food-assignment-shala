const Customer = require('../models/Customer');
const Item = require('../models/Item');
const Restuarant = require('../models/Restuarant');
const Order = require('../models/Order');
module.exports.home =  (req, res)=>{
    return res.render('customer_home', {user: req.user});
}
module.exports.orderPage = (req, res)=>{
    return res.redirect('/');
}
module.exports.register = async (req, res)=>{
    if(req.body.password != req.body.confirmPassword){
        return res.redirect(`back`);
    }
    await Customer.findOne({email: req.body.email}, (err, customer)=>{
        if(err){console.log(`error has occured : ${err}`); return;}

        if(!customer){
            Customer.create(req.body, (err, customer)=>{
                if(err){
                    console.log(`error ${err}`);
                    return;
                }
                return res.redirect(`/`);
            });
        }else{
            return res.redirect(`back`);
        }
    })
    
}
module.exports.order = async (req, res) =>{
    // console.log(req.query);
    let item = await Item.findById(req.query.itemId);
    let customer = await Customer.findById(req.query.customerId);
    console.log(item, customer);
    try{
        let restuarant = await Restuarant.findById(req.query.restuarantId);
            // console.log(restuarant);
            if(restuarant){
                let order = await Order.create({
                    customerId: req.query.customerId,
                    customerName: customer.name,
                    customerEmail: customer.email,
                    itemId: req.query.itemId,
                    itemName: item.name,
                    itemPrice: item.price,
                    restuarantId: req.query.restuarantId
                });
                restuarant.ordersList.push(order);
                restuarant.save();
                return res.send('<h2>Order has been placed, <a href="/">Order more or go back</a></h2>');
            }
            
        } catch (err) {
            console.log(err);
            return;
        }

}

module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{
    req.logout();
    console.log('Logged out');
    return res.redirect('/');
}