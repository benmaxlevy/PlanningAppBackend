const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const User = require("../models/user");
const { generic: genericError } = require("../lib/errorMessages");
const { returnId: successId } = require("../lib/successMessages");
const { sequelize } = require("../models/index");

exports.login = async (req, res) => {
  
};
