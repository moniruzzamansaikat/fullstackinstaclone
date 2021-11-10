const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    if (typeof req.headers.authorization.split(" ")[1] !== "undefined") {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token);

      req.userId = decoded._id;
      return next();
    }
  }

  return res.status(403).send("Unauthorized");
};
