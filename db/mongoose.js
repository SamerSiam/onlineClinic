require("dotenv").config();

const mongoose = require("mongoose");

const uri = `mongodb+srv://admin_1:${process.env.PASSWORD}@test.99q0a.mongodb.net/Bank-API?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
});
