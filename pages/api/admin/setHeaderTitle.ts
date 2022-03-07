import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Common from "../../../models/common";

const setHeaderTitle = (request: NextApiRequest, response: NextApiResponse) => {
    Common.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            headerTitle: request.query.headerTitle
        }
    });
};

export default setHeaderTitle;
