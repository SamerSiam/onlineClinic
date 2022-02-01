const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const userRouter = require("./routers/userRoutes");
const port = process.env.PORT || 5000;
//
const cors = require("cors");
const path = require("path");
//

const app = express();

//authentication
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("get requests are disbaled");
//   } else {
//     next();
//   }
// });
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
//
const publicPath = path.join(__dirname, "client/build");

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("listening on port " + port);
});
// const jwt = require("jsonwebtoken");
// const myFunction = () => {
//   const token = jwt.sign({ id: "123" }, "thisismynewcourse", { expiresIn: "7 days" });
//   console.log(token);
//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };
// myFunction();
