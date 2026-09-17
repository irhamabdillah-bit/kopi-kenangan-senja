const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Format token tidak valid." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decode;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau sudah expired.",
    });
  }
};

module.exports = authMiddleware;
