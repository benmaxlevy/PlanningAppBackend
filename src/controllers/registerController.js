const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const User = require("../models/user");
const { generic: genericError } = require("../lib/errorMessages");
const { returnId: successId } = require("../lib/successMessages");
const { sequelize } = require("../models/index");

exports.register = async (req, res) => {
    const password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("base64");
    try {
        const user = User(sequelize, DataTypes);
        const newUser = await user.create({
            username: req.body.username,
            password,
            email: req.body.email,
        });
        await newUser.save();
        res.status(200);
        return res.json(successId(newUser.id));
    } catch (error) {
        res.status(500);
        return res.json(genericError);
    }
};
