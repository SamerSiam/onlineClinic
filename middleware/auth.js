const jwt = require("jsonwebtoken");
const patients = require("../models/patient");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismycourse");
    const user = await patients.findOne({ _id: decoded._id, "tokens.token": token });

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
