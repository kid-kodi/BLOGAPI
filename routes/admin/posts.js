const Post = require("../../models/Post");
const router = require("express").Router();
const auth = require("../../middleware/auth");

//create a new post
router.post("/create", auth, async (req, res) => {
  try {
    // create new posts
    const newPost = new Post(req.body);
    newPost.author = req.user._id;
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/category/:id", async (req, res) => {
  try {
    const posts = await Post.find({
      categories: { $in: [req.params.id] },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log("RERRR");
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
