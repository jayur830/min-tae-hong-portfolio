// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Dramas from "@root/models/dramas";

// Local

const remove = (request: NextApiRequest, response: NextApiResponse) => {
	const _id = new mongoose.Types.ObjectId(request.query._id as string);
	Dramas.deleteOne({ _id }).exec();
	response.send(200);
};

export default remove;
