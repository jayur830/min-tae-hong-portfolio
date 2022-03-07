import { Schema, model, models } from "mongoose";

export default models.Theaters ? models.Theaters : model("Theaters", new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    theater: String,
    year: Number,
    schedule: String,
    img: {
        filename: String,
        width: Number,
        height: Number
    },
    scenes: [
        {
            filename: String,
            width: Number,
            height: Number
        }
    ]
}, {
    collection: "theaters"
}));