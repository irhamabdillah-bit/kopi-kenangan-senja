const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      ` SELECT products.id, products.name, products.description, products.price, products.image, products.stock, products.is_active, categories.name AS category_name FROM products join categories on products.category_id = categories.id WHERE products.is_active = true`,
    );
    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data product" });
  }
});

module.exports = router;
