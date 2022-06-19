const { model, Schema } = require("mongoose");

const post_schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    required: true,
  },
  posted_by: {
    type: String,
    required: true,
  },
});

const Post = model("Post", post_schema);

module.exports = Post;
