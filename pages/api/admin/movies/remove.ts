import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Movies from "../../../../models/movies";

const remove = (request: NextApiRequest, response: NextApiResponse) => {
    const _id = new mongoose.Types.ObjectId(request.query._id as string);
    Movies.deleteOne({ _id }).exec();
    response.send(200);
};

export default remove;