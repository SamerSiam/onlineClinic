const User = require("../models/user");
const Patient = require("../models/patient");

/**********************get all users******************* */
const getAllUsers = async (req, res) => {
  try {
    const user = await Patient.find({});

    if (!user) {
      return res.status(400).send("User not found!");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

/***********************get me **/
const getMyUser = async (req, res) => {
  res.send(req.user);
};
/**********************get user by id******************* */
const getUserbyID = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await Patient.findById({ _id });

    if (!user) {
      return res.status(400).send("User not found!");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
/**********************add new user************************ */
const addNewUser = async (req, res) => {
  const user = new Patient(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**********************delete user************************ */
const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send("User Removed" + req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

/***********update user **************************/
const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);

  try {
    const user = await Patient.findById(id);

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    if (!user) {
      return res.status(404).send("User not found, unable to upadte user");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

/************************User login */
const userLogin = async (req, res) => {
  try {
    const user = await Patient.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    if (!user || !token) {
      return res.status(404).send("Failed to authenticate user");
    }
    res.send({ user: user, token }); // removes sensitive info
  } catch (err) {
    res.status(400).send();
  }
};

/************************logout */
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

// logout from all sessions
const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

/***************************Module Exports */
module.exports = {
  getAllUsers,
  deleteUser,
  getUserbyID,
  addNewUser,
  updateUser,
  userLogin,
  getMyUser,
  userLogout,
  logOutAll,
};
