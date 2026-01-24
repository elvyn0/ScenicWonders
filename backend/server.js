require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Configuration Imports
const connectDB = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");

// Route Imports
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const blogRouter = require("./routes/blogRoute");
const hotelRouter = require("./routes/hotelRoute");
const bookingRouter = require("./routes/bookingRoute");

// App config
const app = express();
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
app.use("/api/blog", blogRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Backend is alive" });
});

// Server listen
app.listen(port, () => console.log("Server running on port :" + port));
