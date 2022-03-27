// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Dramas from "@root/models/dramas";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Dramas.find({}).exec().then(response.json);
};

export default getData;
