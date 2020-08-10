const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    restuarant: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "Restuarant" 
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;