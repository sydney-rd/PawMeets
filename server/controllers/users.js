import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// adds random chars to end of pw before hashing
let SALT_ROUNDS = 12;
let TOKEN_KEY = "thisisastring";

// for production
if (process.env.NODE_ENV === "production") {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  TOKEN_KEY = process.env.TOKEN_KEY;
}

// for JWT expiration
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      username,
      password_digest,
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body; // Only extract username and password
    const user = await User.findOne({ username: username }).select(
      "username email password_digest dog"
    );
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        dog: user.dog,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("dog");
    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        dog: user.dog,
        exp: parseInt(exp.getTime() / 1000),
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(404).json({ message: "Username not found!" });
    }
    // res.status(201).json(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// export const changePassword = async (req, res) => {}
