import { Schema, model, models } from "mongoose";

export default models.About ? models.About : model("About", new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    birth: String,
    info: String,
    metadata: [
        {
            _id: false,
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
            _id: false,
            comment: String,
            date: String,
            secret: Boolean
        }
    ]
}, {
    collection: "about"
}));