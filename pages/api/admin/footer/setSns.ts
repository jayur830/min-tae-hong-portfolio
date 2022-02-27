import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import { footerCollection } from "../../../../assets/ts/db";

const setSns = (request: NextApiRequest, response: NextApiResponse) => {
    footerCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.body._id as string)
    }, {
        $set: {
            sns: request.body.sns
        }
    });
};

export default setSns;
