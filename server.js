const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const socketio = require("socket.io")(server);
const httpMsgs = require("http-msgs");

// this as a database
let users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

socketio.on("connection", socket => {
  socket.emit("message", "new User connected");

  socket.on("signup", message => {
    users.push(message);
    setInterval(() => {
      console.log(users);
    }, 2000);
    socket.emit("newUser", message);
  });
});

app.post("/dashboard", (req, res) => {
  httpMsgs.sendJSON(req, res, {
    from: {
      damilare: users
    }
  });
});

server.listen("3000", () => {
  console.log("server now listen at port 3000");
});
