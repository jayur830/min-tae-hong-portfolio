import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination(request, file, callback) {
            callback(null, "public/");
        },
        filename(req, file, callback) {
            callback(null, file.originalname);
        }
    })
})

const imgUploader = nextConnect({
    onError(error, request, response) {
        console.log("Error:", error);
    },
    onNoMatch(request, response) {

    }
});

imgUploader.post(upload.single("file"), (request, response) => {
    response.send(200);
});

export default imgUploader;

export const config = {
    api: {
        bodyParser: false
    }
}
