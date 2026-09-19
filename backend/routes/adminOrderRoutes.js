const express = require("express");
const router = express.Router();

const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// GET semua pesanan
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        orders.id,
        orders.costumer_name,
        orders.costumer_phone,
        orders.costumer_address,
        orders.total_price,
        orders.status,
        orders.created_at,
        orders.update_at,

        orders_items.id AS item_id,
        orders_items.quantity,
        orders_items.price AS item_price,

        products.id AS product_id,
        products.name AS product_name,
        products.image AS product_image

      FROM orders
      LEFT JOIN orders_items
        ON orders.id = orders_items.order_id
      LEFT JOIN products
        ON orders_items.product_id = products.id

      ORDER BY orders.created_at DESC
    `);

    // Kelompokkan item berdasarkan order
    const ordersMap = {};

    rows.forEach((row) => {
      if (!ordersMap[row.id]) {
        ordersMap[row.id] = {
          id: row.id,
          costumer_name: row.costumer_name,
          costumer_phone: row.costumer_phone,
          costumer_address: row.costumer_address,
          total_price: row.total_price,
          status: row.status,
          created_at: row.created_at,
          update_at: row.update_at,
          items: [],
        };
      }

      if (row.item_id) {
        ordersMap[row.id].items.push({
          id: row.item_id,
          product_id: row.product_id,
          product_name: row.product_name,
          product_image: row.product_image,
          quantity: row.quantity,
          price: row.item_price,
        });
      }
    });

    const orders = Object.values(ordersMap);

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error("Admin fetch orders error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pesanan.",
    });
  }
});

// UPDATE status pesanan
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["pending", "processing", "completed", "cencelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status pesanan tidak valid.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      message: "Status pesanan berhasil diperbarui.",
    });
  } catch (err) {
    console.error("Update order status error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status pesanan.",
    });
  }
});

module.exports = router;
