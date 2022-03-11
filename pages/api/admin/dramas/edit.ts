import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Dramas from "../../../../models/dramas";

const edit = (request: NextApiRequest, response: NextApiResponse) => {
    Dramas.findByIdAndUpdate(new mongoose.Types.ObjectId(request.body._id), {
        $set: {
            ...request.body
        }
    }).exec();
    response.send(200);
};

export default edit;