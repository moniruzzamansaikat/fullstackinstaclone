const jwt = require("jsonwebtoken");

/**
 *
 * @param {UserObject} object
 * @returns String
 */
exports.getToken = function (object) {
  return jwt.sign(object.toJSON(), process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
