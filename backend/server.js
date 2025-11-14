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

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlerwares
app.use(express.json());
app.use(cors());
app.use("uploads", express.static(path.join(__dirname, "uploads")));

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// Server listen
app.listen(port, () => console.log("Server running on port :" + port));
