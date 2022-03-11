import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Movies from "../../../../models/movies";

const edit = (request: NextApiRequest, response: NextApiResponse) => {
    Movies.findByIdAndUpdate(new mongoose.Types.ObjectId(request.body._id), {
        $set: {
            ...request.body
        }
    }).exec();
    response.send(200);
};

export default edit;