const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
