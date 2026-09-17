const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Akses admin berhasil.",
    data: {
      admin: req.admin,
    },
  });
});

module.exports = router;
