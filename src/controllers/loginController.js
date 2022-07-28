const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const User = require("../models/user");
const { returnId: successId } = require("../lib/successMessages");
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
                password,
            }
        });
        // for "EDA"
        console.log(loginUser.dataValues);
    } catch (e) {
        return next(e);
    }
};
