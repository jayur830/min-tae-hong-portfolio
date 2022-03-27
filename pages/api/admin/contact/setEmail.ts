// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Contact from "@root/models/contact";

// Local

const setEmail = (request: NextApiRequest, response: NextApiResponse) => {
	Contact.findOneAndUpdate(
		{},
		{
			$set: {
				email: request.query.email,
			},
		}
	).exec();
	response.send(200);
};

export default setEmail;
