import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import mongoose from "mongoose";
import { commonCollection } from "../../../assets/ts/db";

const setTitle = (request: NextApiRequest, response: NextApiResponse) => {
    commonCollection.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(request.query._id as string)
    }, {
        $set: {
            title: request.query.title
        }
    });
};

export default setTitle;
