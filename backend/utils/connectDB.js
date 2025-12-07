import mongoose from "mongoose";

export default async function connectDB(uri) {
  await mongoose.connect(uri).then(() => {
    console.log("DATABASE CONNECTED!");
  });
}
