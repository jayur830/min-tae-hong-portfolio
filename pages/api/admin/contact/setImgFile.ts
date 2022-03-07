import { NextApiRequest, NextApiResponse } from "next";

// import fs from "fs";
import mongoose from "mongoose";
import { contactCollection } from "../../../../assets/ts/db";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.body.img);
    // fs.writeFile("public/" + request.body.img.filename, request.body.file, () => null);
    contactCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.body._id as string)
    }, {
        $set: {
            img: request.body.img
        }
    });
};

export default setImgFile;
