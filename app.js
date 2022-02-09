require("./db/mongoose");
const http = require("http");
const express = require("express");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");

const User = require("./models/user");
const userRouter = require("./routers/userRoutes");
const port = process.env.PORT || 5000;
//
const cors = require("cors");
const path = require("path");
//

const app = express();
const publicPath = path.join(__dirname, "client/build");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

// chat server
const chatServer = http.createServer(app);
const io = require("socket.io")(chatServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowHeaders: "*",
  },
});

// client connects, greeting message
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("message", generateMessage("Welcome!"));

  // client sends message, server listens
  socket.on("sendMessage", (message, callback) => {
    console.log("inside server", message);
    const filter = new Filter();
    if (filter.isProfane(message.text)) {
      return callback("Profanity is not allowed!");
    }
    io.emit("message", message);
    callback("Delivered");
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/**************Starting up the server */
chatServer.listen(port, () => {
  console.log("Listening on port " + port);
});
