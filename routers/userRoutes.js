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
router.patch("/users/:id", updateUser);

/**********************user login/logout************************ */
router.post("/users/login", userLogin);
router.post("/users/logout", auth, userLogout);
router.post("/users/logoutAll", auth, logOutAll);

module.exports = router;
