// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import About from "@root/models/about";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	About.find({})
		.exec()
		.then(data => response.json(data[0]));
};

export default getData;
