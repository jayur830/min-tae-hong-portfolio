// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import Movies from "@root/models/movies";

// Local

const getData = (request: NextApiRequest, response: NextApiResponse) => {
	Movies.find({}).exec().then(response.json);
};

export default getData;
