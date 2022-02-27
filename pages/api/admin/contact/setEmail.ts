import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import { contactCollection } from "../../../../assets/ts/db";

const setEmail = (request: NextApiRequest, response: NextApiResponse) => {
    contactCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            email: request.query.email
        }
    });
};

export default setEmail;
