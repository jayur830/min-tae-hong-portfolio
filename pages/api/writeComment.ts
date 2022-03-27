// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import About from "@root/models/about";

// Local

const writeComment = (request: NextApiRequest, response: NextApiResponse) => {
	About.findOneAndUpdate(
		{},
		{
			$push: {
				comments: request.body,
			},
		},
		{
			_id: false,
		}
	).exec();
	response.send(200);
};

export default writeComment;
