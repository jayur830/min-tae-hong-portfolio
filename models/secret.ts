import { Schema, model, models } from "mongoose";

export default models.Secret ? models.Secret : model("Secret", new Schema({
    _id: Schema.Types.ObjectId,
    password: String
}, {
    collection: "secret"
}));