// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Common from "@root/models/common";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Common.find({})
		.exec()
		.then(data => response.json(data[0]));
};

export default getData;
