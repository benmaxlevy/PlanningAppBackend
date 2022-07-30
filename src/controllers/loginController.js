const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/../../.env` });
const User = require("../models/user");
const { returnId: successId } = require("../lib/successMessages");
const { http401: errorHttp401,
    http401
} = require("../lib/errorMessages");
const { sequelize } = require("../models/index");

exports.login = async (req, res, next) => {
    // hash given password
    const password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("base64");
    // find user with applicable information
    try {
        // make user obj using the sequelize instance within the index model
        const user = User(sequelize, DataTypes);
        // find user
        const loginUser = await user.findOne({
            where: {
                username: req.body.username,
                password
            }
        });

        if (loginUser === null) {
            return res.status(401).send(http401);
        }

        // create JWT with JWS
        const userJwt = jwt.sign(
            {
                username: loginUser.dataValues.username,
                email: loginUser.dataValues.email,
                id: loginUser.dataValues.id
            },
            process.env.SECRET,
            { expiresIn: 60*60 }
        );

        return res.status(200).send(userJwt);
    } catch (e) {
        return next(e);
    }
};
