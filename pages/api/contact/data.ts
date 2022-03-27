// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Contact from "@root/models/contact";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Contact.find({})
		.exec()
		.then(data => response.json(data[0]));
};

export default getData;
