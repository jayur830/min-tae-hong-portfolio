// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Theaters from "@root/models/theaters";

// Local

const create = (request: NextApiRequest, response: NextApiResponse) => {
	const _id = new mongoose.Types.ObjectId();
	Theaters.create({
		...request.body,
		_id,
	});
	response.send(_id.toString());
};

export default create;
