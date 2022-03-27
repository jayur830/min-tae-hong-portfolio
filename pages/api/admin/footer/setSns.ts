// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Footer from "@root/models/footer";

// Local

const setSns = (request: NextApiRequest, response: NextApiResponse) => {
	Footer.findOneAndUpdate(
		{},
		{
			$set: {
				sns: request.body.sns,
			},
		}
	).exec();
	response.send(200);
};

export default setSns;
