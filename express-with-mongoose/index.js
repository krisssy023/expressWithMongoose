import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import process from "node:process";
import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
const PORT = process.env.PORT || 3031;

mongoose.connect("mongodb://localhost:27017/social_app");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.set("port", PORT);
app.use(express.json());

//from stackoverflow
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Auhtorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  }
  next();
});

// Add your middleware

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.get("/users", async (req, res) => {
  console.log(await User.find().all());

  res.json(await User.find().all());
});

app.get("/users/:authorId/posts", async (req, res) => {

  const authorId = req.params.authorId;
  const authorPosts = Post.find({authorId:authorId})

  console.log(authorId)

  res.json(await authorPosts);
});

app.get("/posts", async (req, res) => {
  console.log(await Post.find().all());

  res.json(await Post.find().all());
});

app.post("/users", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(req.body);

  const filteredDetails = {
    firstName,
    lastName,
    email,
    password,
  };

  try {
    res.status(201).json(await User.create(filteredDetails));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const filteredDetails = {
    title,
    content,
  };

  //  console.log("authorID",authorID)

  try {
    res.status(201).json(await Post.create(filteredDetails));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.params.id;

  console.log(authorId);

  const filteredDetails = {
    title,
    content,
    authorId,
  };

  try {
    res.status(201).json(await Post.create(filteredDetails));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
