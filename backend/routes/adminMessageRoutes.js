const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// GET semua pesan
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        name,
        email,
        message,
        created_at
      FROM contact_messages
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("Admin fetch messages error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil pesan pelanggan.",
    });
  }
});

// DELETE pesan
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM contact_messages WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      message: "Pesan berhasil dihapus.",
    });
  } catch (err) {
    console.error("Delete message error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus pesan.",
    });
  }
});

module.exports = router;
