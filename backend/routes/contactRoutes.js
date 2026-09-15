const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(404).json({
        success: false,
        message: "Nama, email, dan pesan wajib diisi.",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
    );
    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim.",
      data: { id: result.insertId },
    });
  } catch (err) {
    console.error("Error contact:", err);
    res
      .status(500)
      .json({ success: true, message: "Terjadi kesalahan pada server." });
  }
});

module.exports = router;
