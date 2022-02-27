import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL as string);
const connection = mongoose.connection;

export const commonCollection = connection.collection("common");
export const homeCollection = connection.collection("home");
export const aboutCollection = connection.collection("about");
export const moviesCollection = connection.collection("movies");
export const dramaCollection = connection.collection("drama");
export const theaterCollection = connection.collection("theater");
export const contactCollection = connection.collection("contact");
export const footerCollection = connection.collection("footer");