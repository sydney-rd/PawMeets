import jwt from "jsonwebtoken";
import Dog from "../models/Dog.js";
import User from "../models/User.js";

export const getDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().populate("user");
    res.json(dogs);
  } catch (error) {
    console.log(error.message);
    res.staus(500).json({ error: error.message });
  }
};

export const getDog = async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    res.json(dog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createDog = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.TOKEN_KEY);

    const dog = new Dog({
      ...req.body,
      user: user.id,
    });

    const new_dog = await dog.save();
    await User.findByIdAndUpdate(user.id, { dog: new_dog.id });

    res.status(201).json(dog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateDog = async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findByIdAndUpdate(id, req.body);
    res.status(201).json(dog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteDog = async (req, res) => {
  try {
    const { dogId } = req.params;
    const { userId } = req.body;
    console.log("User ID: ", userId);

    const deleted = await Dog.findByIdAndDelete(dogId); // Delete dog from Dog Collection

    let user = await User.findByIdAndUpdate(userId, { $unset: { dog: 1 } }); // Delete dog from User's dog array
    console.log("User after dog deleted: ", user);

    if (deleted) {
      return res.status(200).send("Dog Deleted!");
    }

    throw new Error("Dog not found");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const likeDog = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const dog = await Dog.findByIdAndUpdate(
      id,
      { $push: { like: req.body.likedDog} },
      { new: true }
    );
    console.log(dog)

    // if (dog) {
    //   // STILL NEED TO ADD CONDITIONAL
    // }
    res.status(201).json(dog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
