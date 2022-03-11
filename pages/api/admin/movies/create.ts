import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Movies from "../../../../models/movies";

const create = (request: NextApiRequest, response: NextApiResponse) => {
    const _id = new mongoose.Types.ObjectId();
    Movies.create({
        ...request.body,
        _id,
    });
    response.send(_id.toString());
};

export default create;