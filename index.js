const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

//Load routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const categoriesRoutes = require("./routes/categories");
const uploadRoutes = require("./routes/upload");

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

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Express server started ${process.env.PORT}`);
});
