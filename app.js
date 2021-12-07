require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());

//Get user context
const User = require("./model/user");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//Register User
app.post("/register", async (req, res) => {
  try {
    //get user input
    const { first_name, last_name, email, password } = req.body;

    //validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All fields are required");
    }

    //check if user already exist
    //Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    //create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

//Login User
app.post("/login", async (req, res) => {
  try {
    //get user input
    const { email, password } = req.body;

    //validate user input
    if (!(email && password)) {
      res.status(400).send("All Fields are required");
    }

    //validate if user exist in out database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
