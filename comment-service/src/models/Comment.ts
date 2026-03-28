import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  article_id: { type: String, required: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  parent_comment_id: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);