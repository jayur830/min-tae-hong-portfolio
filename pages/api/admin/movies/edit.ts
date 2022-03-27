// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Movies from "@root/models/movies";

// Local

const edit = (request: NextApiRequest, response: NextApiResponse) => {
	Movies.findByIdAndUpdate(new mongoose.Types.ObjectId(request.body._id), {
		$set: {
			...request.body,
		},
	}).exec();
	response.send(200);
};

export default edit;
