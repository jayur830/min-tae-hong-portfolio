import { NextApiRequest, NextApiResponse } from "next";

import About from "../../models/about";
import mongoose from "mongoose";

const writeComment = (request: NextApiRequest, response: NextApiResponse) => {
    About.findOneAndUpdate({}, {
        $push: {
            comments: request.body
        }
    }, {
        _id: false
    }).exec();
};

export default writeComment;
