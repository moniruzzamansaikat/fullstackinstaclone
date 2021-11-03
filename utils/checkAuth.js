const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ errors: ["You are not authorized!"] });
  }

  const token =
    req.headers.authorization.split(" ")[1] &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ errors: ["You are not authorized!"] });
  }

  const decoded = jwt.decode(token);
  if (decoded) req.userId = decoded._id;

  next();
};
