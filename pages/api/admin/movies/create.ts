// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Movies from "@root/models/movies";

// Local

const create = (request: NextApiRequest, response: NextApiResponse) => {
	const _id = new mongoose.Types.ObjectId();
	Movies.create({
		...request.body,
		_id,
	});
	response.send(_id.toString());
};

export default create;
