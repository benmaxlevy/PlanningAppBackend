const express = require("express");
const bodyParser = require("body-parser");
const { http404: http404Error } = require("./lib/errorMessages");
const { register: registerController } = require("./controllers/registerController");
require("dotenv").config({ path: `${__dirname}/../.env` });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", registerController);

app.use((req, res, next) => {
    res.status(404);
    return res.json(http404Error);
});

app.listen(process.env.LISTEN_PORT || 8080, () => {
    console.log(`It's on (port ${process.env.LISTEN_PORT || 8080})!`);
});
