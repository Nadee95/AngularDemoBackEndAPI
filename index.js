const express = require('express')
const mongoose = require("mongoose");
const config = require("./config/database");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const users = require("./routes/users");
const products = require("./routes/products");

//const verify = require("./routes/verifyToken");



//connect to db
mongoose.connect(process.env.database, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

mongoose.connection.on("error", err => {
  console.log("Database error " + err);
});


//Express instance
const app = express();

//port number
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;

//CORS Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser Middleware
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/products", products);

app.get("/", (req, res) => {
  res.send("invalid End Point");
});

app.listen(PORT, () => {
  console.log("server started on port:" + PORT);
});


console.log("index file running....");