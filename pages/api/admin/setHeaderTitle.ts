import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import { commonCollection } from "../../../assets/ts/db";

const setHeaderTitle = (request: NextApiRequest, response: NextApiResponse) => {
    commonCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            headerTitle: request.query.headerTitle
        }
    });
};

export default setHeaderTitle;
