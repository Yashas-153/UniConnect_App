const express = require("express");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const searchController = require("./controller/searchController")

const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req, res) => {
    res.json({ msg: "Welcome to the project" });
});

app.use("/api/posts", postRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/auth", authRoutes);
app.post("/api/search",searchController)

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
