import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3"
import AWS from "aws-sdk";

import { app, upload, config } from "../../../assets/ts/s3";

// const app = nextConnect({
//     onError(error, request, response) {
//         console.log("Error:", error);
//     },
//     onNoMatch(request, response) {
//
//     }
// });
//
// AWS.config.update({
//     region: process.env.S3_REGION
// });

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(request, file, callback) {
//             callback(null, "public/");
//         },
//         filename(req, file, callback) {
//             callback(null, file.originalname);
//         }
//     })
// });

// const upload = multer({
//     storage: multerS3({
//         s3: new AWS.S3(),
//         bucket: process.env.S3_BUCKET as string
//     }),
//     limits: {
//         fileSize: 1024 * 1024 * 1024        // 1GB
//     }
// });

app.post(upload.single("file"), (request, response) => {
    response.send(200);
});

export default app;

export { config };