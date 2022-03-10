import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Theaters from "../../../../models/theaters";

const remove = (request: NextApiRequest, response: NextApiResponse) => {
    Theaters.findByIdAndRemove(new mongoose.Types.ObjectId(request.body._id)).exec();
    response.send(200);
};

export default remove;