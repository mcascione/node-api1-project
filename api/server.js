// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());
//get request
server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
});
//get specific user
server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
    });
  }
});
//create a new user
server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const newUser = await User.insert({ name, bio });
      console.log(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: `There was an error while saving the user to the database`,
    });
  }
});
//update a user
server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const updatedUser = await User.update(id, { name, bio });
      if (!updatedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be modified",
    });
  }
});

// delete user
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.remove(id);
    if (!user) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
