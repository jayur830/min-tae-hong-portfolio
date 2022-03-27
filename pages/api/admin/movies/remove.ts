// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Movies from "@root/models/movies";

// Local

const remove = (request: NextApiRequest, response: NextApiResponse) => {
	const _id = new mongoose.Types.ObjectId(request.query._id as string);
	Movies.deleteOne({ _id }).exec();
	response.send(200);
};

export default remove;
