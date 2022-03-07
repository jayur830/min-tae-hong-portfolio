import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Contact from "../../../../models/contact";

const setTel = (request: NextApiRequest, response: NextApiResponse) => {
    Contact.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            tel: request.query.tel
        }
    });
};

export default setTel;
