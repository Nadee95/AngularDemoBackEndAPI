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

  const Product = (module.exports = mongoose.model("Product", ProductSchema));

  module.exports.addProduct = function (newProduct, callback) {
    newProduct.save(callback);
  }
  module.exports.getProduct = function (id) {
    const query = { _id: id };
    return Product.findOne(query, callback);
  };
  module.exports.getAllProducts = function () {
    const query = { _id: id };
    return Product.findOne(query, callback);
  };



  
  