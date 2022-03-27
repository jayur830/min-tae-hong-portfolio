// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Contact from "@root/models/contact";

// Local

const setTel = (request: NextApiRequest, response: NextApiResponse) => {
	Contact.findOneAndUpdate(
		{},
		{
			$set: {
				tel: request.query.tel,
			},
		}
	).exec();
	response.send(200);
};

export default setTel;
