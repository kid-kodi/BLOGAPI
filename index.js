const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

//Load public routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const categoriesRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");

// Laod admin routes
const authAdminRoutes = require("./routes/admin/auth");
const usersAdminRoutes = require("./routes/admin/users");
const postsAdminRoutes = require("./routes/admin/posts");
const categoriesAdminRoutes = require("./routes/admin/categories");

//app configuration
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));
app.use("/", express.static(path.join(__dirname, "uploads")));

//use middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Public api
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", uploadRoutes);

// Admin api
app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/users", usersAdminRoutes);
app.use("/api/admin/posts", postsAdminRoutes);
app.use("/api/admin/categories", categoriesAdminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Express server started ${process.env.PORT}`);
});
