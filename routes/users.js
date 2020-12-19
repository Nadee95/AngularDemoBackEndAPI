const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");


const User = require("../models/user"); 




//Register new user  
router.post("/register", async (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("email already exists.");
  
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password
    });
  
    let addedUser = await User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: "Fail to register user."
        });
        console.log(err);
      } else {
        res.send({ success: true, msg: "User registered.", addedUser }); //filtr user obj
      }
    });
});



//login user

router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not found.");

  const validPass = await User.checkPassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password.");

  const token = jwt.sign(
    { _id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, phone: user.phone },
    process.env.SECRET_KEY,
    {
      expiresIn: 6048000
    }
  );
  try {
    res
      .json({
        success: true,
        token: token
        //token: "JWT " + token
      })
      .send();
    //res.header("auth_token", token).send();
  } catch (error) {
    console.log(error);
  }
});


//Update user
router.put("/updateUser", async function(req, res, next) {

  if (!req.body._id) {
    return res.status(400).send({
      message: " content cannot be empty"
    });
  }

  User.findByIdAndUpdate(req.body._id, req.body.userUpdate, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Fail to register Driver."
      });
      console.log(err);
    } else {
      console.log("User Find", user);
      return res.status(200).send({
        message: "user updated successfully"
      });

    }
  });

});



//Get All Users
router.get("/allUsers",  async (req, res, next) => {
    User.find({}, '-__v -password', (error, users) => {
    if (error) {
      return next(error);
    } else {
      return res.json(users).send();
     
    }
  });
});


//Delete a user
router.delete("/deleteUser/:_Id", async (req, res, next) => {
  User.findByIdAndRemove(req.params._Id, (error, user) => {
    if (error) {
      return next(error);
    } else {
      return res.json({SUCCESS: true, message:"user deleted"}).send();
    }
  });
});


module.exports = router;