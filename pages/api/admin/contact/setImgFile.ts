import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Contact from "../../../../models/contact";

const setImgFile = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.body._id as string)
    }, {
        $set: {
            img: request.body.img
        }
    });
};

export default setImgFile;
