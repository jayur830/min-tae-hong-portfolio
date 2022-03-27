// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import About from "@root/models/about";

// Local

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
	About.findOneAndUpdate(
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
