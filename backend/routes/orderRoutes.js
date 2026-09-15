const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { customer_name, customer_phone, customer_address, items } = req.body;

    if (
      !customer_name ||
      !customer_phone ||
      !customer_address ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Data pesanan belum lengkap.",
      });
    }

    await connection.beginTransaction();

    let totalPrice = 0;

    for (const item of items) {
      const [products] = await connection.execute(
        `SELECT id, price, stock
         FROM products
         WHERE id = ? AND is_active = true`,
        [item.product_id],
      );

      if (products.length === 0) {
        throw new Error(`Produk dengan ID ${item.product_id} tidak ditemukan.`);
      }

      const product = products[0];

      if (product.stock < item.quantity) {
        throw new Error(`Stok produk tidak mencukupi.`);
      }

      totalPrice += Number(product.price) * Number(item.quantity);
    }

    const [orderResult] = await connection.execute(
      `INSERT INTO orders
      (
        costumer_name,
        costumer_phone,
        costumer_address,
        total_price
      )
      VALUES (?, ?, ?, ?)`,
      [customer_name, customer_phone, customer_address, totalPrice],
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [products] = await connection.execute(
        `SELECT price
         FROM products
         WHERE id = ?`,
        [item.product_id],
      );

      const price = products[0].price;

      await connection.execute(
        `INSERT INTO orders_items
        (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, price],
      );

      await connection.execute(
        `UPDATE products
         SET stock = stock - ?
         WHERE id = ?`,
        [item.quantity, item.product_id],
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat.",
      data: {
        order_id: orderId,
        total_price: totalPrice,
      },
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error order:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Terjadi kesalahan pada server.",
    });
  } finally {
    connection.release();
  }
});

module.exports = router;
