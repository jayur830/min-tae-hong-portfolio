// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Dramas from "@root/models/dramas";

// Local

const create = (request: NextApiRequest, response: NextApiResponse) => {
	const _id = new mongoose.Types.ObjectId();
	Dramas.create({
		...request.body,
		_id,
	});
	response.send(_id.toString());
};

export default create;
