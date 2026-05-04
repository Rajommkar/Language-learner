const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token;

    if (req.headers.cookie) {
      const cookies = Object.fromEntries(
        req.headers.cookie.split(";").map(c => {
          const parts = c.trim().split("=");
          return [parts[0], parts.slice(1).join("=")];
        })
      );
      if (cookies.token) {
        token = cookies.token;
      }
    }

    if (!token) {
      const authHeader = req.header("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
