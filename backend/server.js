require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Configuration Imports
const connectDB = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");

// Route Imports
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const storiesRouter = require("./routes/storyRoute");
const hotelRouter = require("./routes/hotelRoute");
const bookingRouter = require("./routes/bookingRoute");
const conversationRouter = require("./routes/conversationRoute");
const messageRouter = require("./routes/messageRoute");
const paymentRouter = require("./routes/paymentRoutes");
const aiRouter = require("./routes/aiBotRoute");

// App config
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlerwares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("uploads", express.static(path.join(__dirname, "uploads")));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/story", storiesRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ai", aiRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// Socket.io
const socketHandler = require("./sockets/socketHandler");

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  },
});
socketHandler(io);

// Server listen
server.listen(port, () => console.log(`Server running on port: ${port}`));
