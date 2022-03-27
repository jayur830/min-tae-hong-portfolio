// Package
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

// Global
import { s3 } from "@assets/ts/s3";

// Local

const getImage = (request: NextApiRequest, response: NextApiResponse) => {
	console.log("S3 Bucket URL:", process.env.S3_BUCKET_URL);

	s3.getObject({
		Bucket: process.env.S3_BUCKET_URL as string,
		Key: request.query.filename as string,
	})
		.createReadStream()
		.pipe(response);
	// fs.readFile("assets/imgs/" + request.query.filename, (error, data) => {
	//     response.writeHead(200, { "Content-Type": "image/*" });
	//     response.status(200).end(data);
	// });
};

export default getImage;
