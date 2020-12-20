const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");

const Product = require("../models/Product");


router.get("/allProducts",verify ,async (req, res, next) => {
  Product.find({}, '-__v', (error, prod) => {
    if (error) {
      return next(error);
    } else {
      return res.send(prod);
     
    }
});
});


router.post("/addProduct", async (req, res, next)=>{

    let newProduct = new Product({
    name : req.body.name,
    description :req.body.description,
    quantity : req.body.quantity
    });
   
    let addedProduct = await Product.addProduct(newProduct, (err, prod) => {
     
      if (err) {
        res.json({
          success: false,
          msg: "Fail to add product."
        });
        console.log(err);
      } else {
        res.send({ success: true, msg: "Product added.", prod} );
      }
    });
  });


router.get("/:_Id",async (req, res, next) => {

    Product.findById(req.params._Id, (err, product) => {
      if (err) {
        return res.status(404).send(err);
      }
      if (product) {
        return res.status(200).send(product);
      }
    });
  });

  
module.exports = router;