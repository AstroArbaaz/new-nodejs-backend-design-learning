/* eslint-disable max-len */
require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utilities/logger");

// const local = process.env.LOCAL_DB; // use this when you need local mongodb database
const database = process.env.CLOUD_DB; // use this for cloud mongodb database connection

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = async () => {
    try {
        await mongoose.connect(database, options);
        logger.info("MongoDB connected!!");
    } catch (error) {
        logger.error("Failed to connect to MongoDB", error);
        setTimeout(connectDB, 5000); // if the connection is not made properly, retry to connect to the database after 5 seconds.
    }
};

module.exports = connectDB;
