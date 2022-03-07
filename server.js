// @ts-ignore
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.prepare()
    .then(() => {
        console.log("Connecting to MongoDB...");
        dotenv.config();
        mongoose.connect(process.env.MONGO_URL);
    }).then(() => {
        console.log("Successfully connected to MongoDB!");
        const server = express();

        server.get("*", handle);
        server.listen(3000, error => {
            if (error) throw error;
            console.log("started server on 3000 port.");
        });
    }).catch(e => {
        console.log(e.stack);
        process.exit(1);
    });