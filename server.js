const express = require("express");
// eslint-disable-next-line import/no-unresolved
require("dotenv").config();
const connectDB = require("./src/database/mongodb_connection");

const morganMiddleware = require("./src/middlewares/morgan");
// The morgan middleware does not need this.
// This is for a manual log
const logger = require("./src/utilities/logger");

const app = express();
const port = process.env.PORT;

const adminRoutes = require("./src/routers/admin");

connectDB();

// Add the morgan middleware
app.use(morganMiddleware);

app.get("/test", (req, res) => {
    logger.info("Checking the API status: Everything is OK");
    res.status(200).send(
        {
            message: "Hey Dev!",
        },
    );
});

app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    logger.info(`server is running on port:${port}`);
});
