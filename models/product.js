const mongoose = require("mongoose");
const config = require("../config/database");

const ProductSchema = mongoose.Schema({
    name: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  });
  
  module.exports.getProduct = function (id) {
    const query = { _id: id };
    return Product.findOne(query, callback);
  };
  module.exports.getAllProducts = function () {
    const query = { _id: id };
    return Product.findOne(query, callback);
  };



  const Product = (module.exports = mongoose.model("Product", ProductSchema));
  