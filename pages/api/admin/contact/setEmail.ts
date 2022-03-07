import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Contact from "../../../../models/contact";

const setEmail = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            email: request.query.email
        }
    });
};

export default setEmail;
