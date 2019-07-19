import express from "express";
import http from "http";
import path from "path";
import socketio from "socket.io";

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = socketio(server);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    socket.on("chat message client", (message) => {
        io.emit("chat message server", message);
    });
});

server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
