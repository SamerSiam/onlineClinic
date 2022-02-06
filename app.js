require("./db/mongoose");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const User = require("./models/user");
const userRouter = require("./routers/userRoutes");
const port = process.env.PORT || 5000;
//
const cors = require("cors");
const path = require("path");
//

const app = express();
const chatServer = http.createServer(app);
// const io = socketio(chatServer);

const io = require("socket.io")(chatServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowHeaders: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
//
const publicPath = path.join(__dirname, "client/build");

app.use(express.static(publicPath));

io.on("connection", () => {
  console.log("New WebSocket connection");
});
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});
chatServer.listen(port, () => {
  console.log("listening on port " + port);
});
