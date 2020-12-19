const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");
const { number } = require("@hapi/joi");

//user schema
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
  phone: {
    type: Number
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", userSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.checkEmail = function (query) {
  return User.findOne(query);
};
module.exports.checkPassword = function (reqPass, pass) {
  return bcrypt.compare(reqPass, pass);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  return User.findOne(query, callback);
};


//save a new user with encrypted password
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
  return newUser;
};



module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
