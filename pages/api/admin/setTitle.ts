// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Common from "@root/models/common";

// Local

const setTitle = (request: NextApiRequest, response: NextApiResponse) => {
	Common.findOneAndUpdate(
		{},
		{
			$set: {
				title: request.query.title,
			},
		}
	).exec();
	response.send(200);
};

export default setTitle;
