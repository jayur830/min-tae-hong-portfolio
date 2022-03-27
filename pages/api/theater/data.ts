// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Theaters from "@root/models/theaters";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Theaters.find({}).exec().then(response.json);
};

export default getData;
