const express = require("express");
const bodyParser = require("body-parser");
const { http404: http404Error } = require("./lib/errorMessages");
const {
    register: registerController,
} = require("./controllers/registerController");
const { login: loginController } = require("./controllers/loginController");
const { generic: genericError } = require("./lib/errorMessages");
require("dotenv").config({ path: `${__dirname}/../.env` });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", registerController);
app.post("/login", loginController)

app.use((req, res, next) => {
    res.status(404);
    return res.json(http404Error);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    return res.json(genericError);
});

app.listen(process.env.LISTEN_PORT || 8080, () => {
    console.log(`It's on (port ${process.env.LISTEN_PORT || 8080})!`);
});
