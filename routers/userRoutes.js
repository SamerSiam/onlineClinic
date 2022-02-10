const express = require("express");
const auth = require("../middleware/auth");
const {
  getAllUsers,
  deleteUser,
  getUserbyID,
  addNewUser,
  updateUser,
  userLogin,
  getMyUser,
  userLogout,
  logOutAll,
  updateMyUser,
} = require("../controllers/apiControllers");

const router = new express.Router();

/**********************get  users******************* */
router.get("/users", getAllUsers);
//router.get("/users", auth, getAllUsers);
router.get("/users/me", auth, getMyUser);
router.get("/users/:id", getUserbyID);

/**********************add new user************************ */
router.post("/users", addNewUser);

/**********************delete user by id************************ */
router.delete("/users", auth, deleteUser);

/**********************update user by id************************ */
// router.patch("/users/:id", updateUser);
//update my user
router.patch("/users/me", auth, updateMyUser);

/**********************user login/logout************************ */
router.post("/users/login", userLogin);
router.post("/users/logout", auth, userLogout);
router.post("/users/logoutAll", auth, logOutAll);

module.exports = router;
