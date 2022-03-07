import { NextApiRequest, NextApiResponse } from "next";

import About from "../../models/about";
import mongoose from "mongoose";

const writeComment = (request: NextApiRequest, response: NextApiResponse) => {
    About.findOneAndUpdate({}, {
        $push: {
            comments: {
                comment: request.body.comment,
                date: request.body.date,
                secret: request.body.secret
            }
        }
    }, {
        _id: false
    }).exec();
};

export default writeComment;
