// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Footer from "@root/models/footer";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Footer.find({})
		.exec()
		.then(data => response.json(data[0]));
};

export default getData;
