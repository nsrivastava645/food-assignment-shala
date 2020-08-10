const Restuarant = require('../models/Restuarant');
const Item = require('../models/Item');
const Order = require('../models/Order');

module.exports.home = async (req, res)=>{
    return res.render('restuarant_home');
}
module.exports.order = (req, res)=>{
    return res.send(`<h1>Restuarant's can not place orders </h1>`);
}
module.exports.register = async (req, res)=>{

    if(req.body.password != req.body.confirmPassword){
        return res.send(`<h1>Password and Confirm Passwwords dont match</h1>`);
    }
    await Restuarant.findOne({email: req.body.email}, (err, restuarant)=>{
        if(err){
            return res.send(`<h1>Database error, could not query the db</h1>`); 
        }

        if(!restuarant){
            Restuarant.create(req.body, (err, restuarant)=>{
                if(err){
                    return res.send(`<h1>Cannot add the entry to the database </h1>`);
                }
                return res.render(`restuarant_login`);
            });
        }else{
            return res.send(`<h1>Restuarant already exists on our database kindly <a href='/restuarant/restuarant_login'>login </a></h1>`);
        }
    })
    
}

module.exports.viewOrders = async (req, res)=>{
    // console.log(req.params);
    let orders = await Order.find({restuarantId: req.params.id});
    return res.render('view_orders', {orders: orders});
    
}
module.exports.viewMenuItems = async (req, res)=>{
    console.log(req.params);
    let restuarant = await Restuarant.findById(req.params.id).populate('menuItems');
    let menuItems = restuarant.menuItems;
    // console.log(menuItems);
    return res.render('menu_items', {menuItems: menuItems});
}




module.exports.addItemsPage = (req, res)=>{
    if(req.isAuthenticated()){
        return res.render('add_items_page', {user: res.locals.user});
    }
    return res.render('restuarant_login');
}

module.exports.addItem = async (req,res) => {
    if(req.params.id == req.user.id){
        try {
            let restuarant = await Restuarant.findById(req.params.id);
            // console.log(restuarant);
            if(restuarant){
                let item = await Item.create({
                    name: req.body.name,
                    about: req.body.about,
                    isVeg: req.body.isVeg,
                    imgSrc: req.body.imgSrc,
                    price: req.body.price,
                    restuarant: req.user,
                });
                restuarant.menuItems.push(item);
                restuarant.save();
                return res.redirect(`/restuarant/view-menu/${req.params.id}`);
            }
            
        } catch (err) {
            console.log(err);
            return;
        }
    }
    return res.send('Item added success');
}
module.exports.createSession = (req, res)=>{
    return res.redirect('/restuarant/home');
}

module.exports.destroySession = (req, res)=>{
    req.logout();
    console.log('Logged out');
    return res.redirect('/');
}
