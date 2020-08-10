const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        customerId: {type: mongoose.Types.ObjectId, ref: 'customer', required: true},
        customerName: {type: String, required: true},
        customerEmail: {type: String, required: true},
        itemId: {type: mongoose.Types.ObjectId, ref: 'item', required: true},
        itemName: {type: String, required: true},
        itemPrice: {type: String, required: true},
        restuarantId: {type: mongoose.Types.ObjectId, ref: 'restuarant', required: true},
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;