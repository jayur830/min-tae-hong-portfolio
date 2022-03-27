// @ts-ignore
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

app
	.prepare()
	.then(() => {
		console.log("Connecting to MongoDB...");
		dotenv.config();
		mongoose.connect(process.env.MONGO_URL);
	})
	.then(() => {
		console.log("Successfully connected to MongoDB!");
		const server = express();

		console.log("S3 Bucket name:", process.env.S3_BUCKET);
		console.log("S3 Region:", process.env.S3_REGION);

		server.get("*", handle);
		server.post("*", handle);
		server.put("/api/*", handle);
		server.delete("/api/*", handle);

		const port = 3002;

		server.listen(port, error => {
			if (error) throw error;
			console.log(`started server on ${port} port.`);
		});
	})
	.catch(e => {
		console.log(e.stack);
		process.exit(1);
	});
