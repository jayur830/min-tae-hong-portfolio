import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Theaters from "../../../../models/theaters";

const remove = (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query._id);
    const _id = new mongoose.Types.ObjectId(request.query._id as string);
    console.log(_id);
    Theaters.deleteOne({ _id }).exec();
    response.send(200);
};

export default remove;