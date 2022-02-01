const jwt = require("jsonwebtoken");
const users = require("../models/user");
const auth = async (req, res, next) => {
  console.log("inside auth:", req.header("Authorization"));
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("token:", token);
    const decoded = jwt.verify(token, "thisismycourse");
    const user = await users.findOne({ _id: decoded._id, "tokens.token": token });
    console.log("user:", user);
    console.log("token:", token);
    console.log("decode:", decoded);
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
