import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    minlength: 5,
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    minlength: 10,
  },
  createdAt: {
    type: Date,
    // default: Date.now,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
