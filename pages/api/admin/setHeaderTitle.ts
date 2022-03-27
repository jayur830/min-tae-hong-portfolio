// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Common from "@root/models/common";

// Local

const setHeaderTitle = (request: NextApiRequest, response: NextApiResponse) => {
	Common.findOneAndUpdate(
		{},
		{
			$set: {
				headerTitle: request.query.headerTitle,
			},
		}
	).exec();
	response.send(200);
};

export default setHeaderTitle;
