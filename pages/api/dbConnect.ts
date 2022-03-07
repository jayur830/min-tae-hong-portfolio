import dotenv from "dotenv";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const dbConnect = (request: NextApiRequest, response: NextApiResponse) => {
    (async () => {
        dotenv.config();
        await mongoose.connect(process.env.MONGO_URL as string);
    })();
};

export default dbConnect;