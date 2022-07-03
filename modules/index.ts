// Package
import nextConnect from 'next-connect';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

// Global

// Local

AWS.config.update({
	region: process.env.S3_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

export const app = nextConnect({
	onError(error, request, response) {
		console.log('Error:', error);
	},
	onNoMatch(request, response) {},
});

export const s3 = new AWS.S3();

export const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.S3_BUCKET as string,
		key(req, file, callback) {
			callback(null, file.originalname);
		},
	}),
	limits: {
		fileSize: 10 * 1024 * 1024 * 1024, // 10GB
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};
