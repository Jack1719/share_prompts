import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.MONGODB_DB,
    });

    isConnected = !!db.connections[0].readyState;
    console.log('MongoDB connected')
  } catch (err) {
    console.log(err);
  }
}