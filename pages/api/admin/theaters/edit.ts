import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Theaters from "../../../../models/theaters";

const edit = (request: NextApiRequest, response: NextApiResponse) => {
    Theaters.findByIdAndUpdate(new mongoose.Types.ObjectId(request.body._id), {
        $set: {
            ...request.body
        }
    }).exec();
    response.send(200);
};

export default edit;