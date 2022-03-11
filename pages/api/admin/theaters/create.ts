import { NextApiRequest, NextApiResponse } from "next";

import mongoose from "mongoose";
import Theaters from "../../../../models/theaters";

const create = (request: NextApiRequest, response: NextApiResponse) => {
    const _id = new mongoose.Types.ObjectId();
    Theaters.create({
        ...request.body,
        _id,
    });
    response.send(_id.toString());
};

export default create;