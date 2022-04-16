// importing dependecies
const express = require("express");
const compression = require("compression");
// eslint-disable-next-line import/no-unresolved
require("dotenv").config();
// importing databse
const connectDB = require("./src/database/mongodb_connection");

// importing morgam middleware
const morganMiddleware = require("./src/middlewares/morgan");

// The morgan middleware does not need this.
// This is for a manual log
const logger = require("./src/utilities/logger");

// variables
const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;
// variable for compression options
const compressionFilter = (req, res) => {
    if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
};
const compressionOptions = {
    level: 6,
    threshold: 0,
    filter: compressionFilter,
};

const adminRoutes = require("./src/routers/admin");

// connecting to the databse.
connectDB();

// Add the morgan middleware.
app.use(morganMiddleware);
// compression middleware to save response load time
app.use(compression({ compressionOptions }));
// express body parsing middleware.
app.use(express.json({ limit: "50mb", parameterLimit: 1000 }));
app.use(express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 1000 }));

// test route
app.get("/test", (req, res) => {
    logger.info("Checking the API status: Everything is OK");
    res.status(200).send(
        {
            message: "Hey Dev!",
        },
    );
});

// api routes
app.use("/api/admin", adminRoutes);

// exposing the server in port.
app.listen(port, () => {
    logger.info(`server is running on port:${port}`);
});
