import mongoose from "mongoose";

// const URL = `mongodb+srv://user:admin123@cluster0.ouusdwa.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async (url) => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
