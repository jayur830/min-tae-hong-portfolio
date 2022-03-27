// Package
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Global
import Dramas from "@root/models/dramas";

// Local

const edit = (request: NextApiRequest, response: NextApiResponse) => {
	Dramas.findByIdAndUpdate(new mongoose.Types.ObjectId(request.body._id), {
		$set: {
			...request.body,
		},
	}).exec();
	response.send(200);
};

export default edit;
