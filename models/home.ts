import { Schema, model, models } from "mongoose";

export default models.Home ? models.Home : model("Home", new Schema({
    _id: Schema.Types.ObjectId,
    filename: String,
    width: Number,
    height: Number
}, {
    collection: "home"
}));