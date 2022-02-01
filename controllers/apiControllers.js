const User = require("../models/user");

/**********************get all users******************* */
const getAllUsers = async (req, res) => {
  console.log("getAllUsers");

  try {
    const user = await User.find({});

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
    const user = await User.findById({ _id });

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
  const user = new User(req.body);
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
    // const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) {
    //   return res.status(404).send("User Not Found!");
    // }
    // const user = req.user;
    // const deletedUser = await User.findByIdAndDelete(user.id);
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
    const user = await User.findById(id);

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
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
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

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
};
/*******************************Deposit cash ******** */
const depositCash = async (req, res) => {
  const { id, cash } = req.body;

  const update = { $inc: { cash: cash } };
  if (cash <= 0) {
    return res.status(400).send(`Deposit Amount {${cash}} must be greater than 0!`);
  }
  try {
    const user = await User.findById(id);
    user[cash] = user[cash] + cash;
    await user.save();
    // const user = await User.findByIdAndUpdate(id, update, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res.status(404).send("User not found, unable to deposit cash");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
/*******************************Increase Credit ******** */
const increaseCredit = async (req, res) => {
  const { id, credit } = req.body;

  const update = { $inc: { credit: credit } };
  if (credit <= 0) {
    return res.status(400).send(`Credit Amount {${credit}} must be greater than 0!`);
  }
  try {
    const user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found, Unable to update credit");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
/*******************************Withdraw cash ******** */
const withdrawCash = async (req, res) => {
  const { id, cash } = req.body;

  const update = { $inc: { cash: -1 * cash } };
  if (cash <= 0) {
    return res.status(400).send(`Withdraw Amount {${cash}} must be greater than 0!`);
  }
  try {
    const getUser = await User.findById(id);
    console.log(getUser);
    if (getUser.cash - cash < 0) {
      return res.status(400).send("Not enough funds in your account!");
    }
    const user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found, Unable to withdraw cash");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

/*******************************Withdraw  credit******** */
const withdrawCredit = async (req, res) => {
  const { id, credit } = req.body;

  const update = { $inc: { credit: -1 * credit } };
  if (credit <= 0) {
    return res.status(400).send(`Withdraw Amount {${credit}} must be greater than 0!`);
  }
  try {
    const getUser = await User.findById(id);
    if (getUser.credit - credit < 0) {
      return res.status(400).send("Not enough funds in your account!");
    }
    const user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// /*******************************Transfer cash******** */

const transferCash = async (req, res) => {
  const { fromId, toId, cash } = req.body;
  const updateUsr1 = { $inc: { cash: -1 * cash } };
  const updateUsr2 = { $inc: { cash: cash } };
  if (cash <= 0) {
    return res.status(400).send(`Transfer Amount {${cash}} must be greater than 0!`);
  }
  try {
    const fromUser = await User.findById(fromId);
    const toUser = await User.findById(toId);

    if (!fromUser || !toUser) {
      return res.status(404).send("One or more users do not exist!");
    }
    if (fromUser.cash - cash < 0) {
      return res.status(400).send("Not enough funds in your account to perform transfer!");
    }

    const user1 = await User.findByIdAndUpdate(fromId, updateUsr1, {
      new: true,
      runValidators: true,
    });
    const user2 = await User.findByIdAndUpdate(toId, updateUsr2, {
      new: true,
      runValidators: true,
    });

    if (!user1 || !user2) {
      return res.status(404).send("One or more users do not exist!");
    }
    res.send(user1 + user2);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
// /*******************************Transfer credit******** */

const transferCredit = async (req, res) => {
  const { fromId, toId, credit } = req.body;
  const updateUsr1 = { $inc: { credit: -1 * credit } };
  const updateUsr2 = { $inc: { credit: credit } };
  if (credit <= 0) {
    return res.status(400).send(`Transfer Amount {${credit}} must be greater than 0!`);
  }
  try {
    const fromUser = await User.findById(fromId);
    const toUser = await User.findById(toId);

    if (!fromUser || !toUser) {
      return res.status(404).send("One or more users do not exist!");
    }
    if (fromUser.credit - credit < 0) {
      return res.status(400).send("Not enough funds in your account to perform transfer!");
    }

    const user1 = await User.findByIdAndUpdate(fromId, updateUsr1, {
      new: true,
      runValidators: true,
    });
    const user2 = await User.findByIdAndUpdate(toId, updateUsr2, {
      new: true,
      runValidators: true,
    });

    if (!user1 || !user2) {
      return res.status(404).send("One or more users do not exist!");
    }
    res.send(user1 + user2);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
/***************************Module Exports */
module.exports = {
  getAllUsers,
  deleteUser,
  getUserbyID,
  addNewUser,
  depositCash,
  increaseCredit,
  withdrawCash,
  withdrawCredit,
  transferCash,
  transferCredit,
  updateUser,
  userLogin,
  getMyUser,
  userLogout,
  logOutAll,
};
