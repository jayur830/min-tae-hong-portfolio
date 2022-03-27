// Package
import { NextApiRequest, NextApiResponse } from "next";

// Global
import { s3 } from "@assets/ts/s3";

// Local

const getImage = (request: NextApiRequest, response: NextApiResponse) => {
	s3.getObject(
		{
			Bucket: process.env.S3_BUCKET as string,
			Key: request.query.filename as string,
		},
		(err, data) => {
			if (err) throw err;
			response.send(data.Body);
		}
	);
};

export default getImage;
