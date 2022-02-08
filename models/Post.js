const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    coverPicture: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["private", "public"],
      },
      default: "private",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();

  delete postObject.__v;

  return postObject;
};

postSchema.pre("save", async function (next) {
  const post = this;

  next();
});

postSchema.pre("remove", async function (next) {
  const post = this;

  // Remove Object attach to the post
  //await Task.deleteMany({ owner: post._id });

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
