import mongoose from "mongoose";

const LinkModel = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    visits: { type: Number, required: true },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkModel);

export default Link;
