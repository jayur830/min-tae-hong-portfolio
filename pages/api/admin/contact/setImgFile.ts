// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Contact from "@root/models/contact";

// Local

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
	Contact.findOneAndUpdate(
		{},
		{
			$set: {
				img: request.body.img,
			},
		}
	).exec();
	response.send(200);
};

export default setImgFile;
