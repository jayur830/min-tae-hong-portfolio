import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import { contactCollection } from "../../../../assets/ts/db";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    contactCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.body._id as string)
    }, {
        $set: {
            img: request.body.img
        }
    });
};

export default setImgFile;
