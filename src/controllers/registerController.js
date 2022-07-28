const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const User = require("../models/user");
const { generic: genericError } = require("../lib/errorMessages");
const { returnId: successId } = require("../lib/successMessages");
const { sequelize } = require("../models/index");

exports.register = async (req, res, next) => {
    // hash pass
    const password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("base64");
    try {
        // make user obj using the sequelize instance within the index model
        const user = User(sequelize, DataTypes);
        // attempt to create (and, intrinsically, save) a new user
        const newUser = await user.create({
            username: req.body.username,
            password,
            email: req.body.email
        });
        res.status(200);
        return res.json(successId(newUser.id));
    } catch (e) {
        return next(e);
    }
};
