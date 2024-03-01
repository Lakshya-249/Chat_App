const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const port = 5000;

const io = new Server(server);

app.use(express.static("./client"));

io.on("connection",(socket)=>{
    socket.on("send",(data)=>{
        socket.broadcast.emit("receive",data);
    })
})


server.listen(port,()=>{
    console.log("server running...");
})