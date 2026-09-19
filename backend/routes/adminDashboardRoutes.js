const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    // Total semua produk
    const [productRows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM products
    `);

    // Total semua pesanan
    const [orderRows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM orders
    `);

    // Total pesan pelanggan
    const [messageRows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM contact_messages
    `);

    // Total pendapatan
    // Pesanan yang cancelled tidak dihitung
    const [revenueRows] = await db.query(`
      SELECT COALESCE(SUM(total_price), 0) AS total
      FROM orders
      WHERE status != 'cencelled'
    `);

    const [recentOrderRows] = await db.query(`
  SELECT
    id,
    costumer_name,
    total_price,
    status,
    created_at
  FROM orders
  ORDER BY created_at DESC
  LIMIT 5
`);

    const [lowStockRows] = await db.query(`
  SELECT
    id,
    name,
    stock,
    image
  FROM products
  WHERE stock <= 5
  ORDER BY stock ASC
  LIMIT 5
`);

    res.json({
      success: true,
      data: {
        totalProducts: productRows[0].total,
        totalOrders: orderRows[0].total,
        totalMessages: messageRows[0].total,
        totalRevenue: revenueRows[0].total,
        recentOrders: recentOrderRows,
        lowStockProducts: lowStockRows,
      },
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard.",
    });
  }
});

module.exports = router;
