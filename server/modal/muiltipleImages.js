import mongoose, { Schema } from "mongoose";
const userScheme = new Schema({
  email: { type: String },
  password: { type: String },
  image: { type: Array },
});

const muiltiImagesModal = mongoose.model("muiltipleImage", userScheme);
export default muiltiImagesModal;
