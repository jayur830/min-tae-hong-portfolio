import { Schema, model, models } from "mongoose";

export default models.About ? models.About : model("About", new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    birth: String,
    info: String,
    metadata: [
        {
            label: String,
            value: String
        }
    ],
    img: {
        filename: String,
        width: Number,
        height: Number
    },
    comments: [
        {
            comment: String,
            date: String,
            secret: Boolean
        }
    ]
}, {
    collection: "about"
}));