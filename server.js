const express = require("express");
// eslint-disable-next-line import/no-unresolved
require("dotnev").config();

const app = express();
const port = process.env.PORT;

app.get("/test", (req, res) => {
    res.status(200).send(
        {
            message: "Hello Fellas!",
        },
    );
});

app.listen(port, () => console.log(`server is running on port:${port}`));
