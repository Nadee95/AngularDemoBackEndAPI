const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

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

  router.get("/allProducts", async (req, res, next) => {
    Product.find({ }, '-__v ', (error, users) => {
      if (error) {
        return next(error);
      } else {
        res.json(users).send();
      }
  });
});

module.exports = router;