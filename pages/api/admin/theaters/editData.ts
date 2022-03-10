import { NextApiRequest, NextApiResponse } from "next";

// import Theaters from "../../../../models/theaters";

const editData = (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.body);
    response.status(200);

    // Theaters.findByIdAndUpdate(request.body._id, {
    //     $set: {
    //         sns: request.body.sns
    //     }
    // }).exec();
};

export default editData;
