// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import About from "@root/models/about";

// Local

const setMetadata = (request: NextApiRequest, response: NextApiResponse) => {
	About.findOneAndUpdate(
		{},
		{
			$set: {
				metadata: request.body.metadata,
			},
		}
	).exec();
	response.send(200);
};

export default setMetadata;
