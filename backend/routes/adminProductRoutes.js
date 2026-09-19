const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format gambar tidak didukung."));
    }
  },
});

// =========================
// GET PRODUCTS
// =========================

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.image,
        products.stock,
        products.category_id,
        products.is_active,
        categories.name AS category_name
      FROM products
      JOIN categories
        ON products.category_id = categories.id
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("Admin fetch products error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data produk admin.",
    });
  }
});

// =========================
// ADD PRODUCT
// =========================

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category_id, description, stock, is_active } =
      req.body;

    if (!name || !price || !category_id || !stock) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, kategori, dan stok wajib diisi.",
      });
    }

    const image = req.file ? req.file.filename : null;

    const [result] = await db.execute(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        image,
        stock,
        category_id,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        description || null,
        price,
        image,
        stock,
        category_id,
        is_active === "false" ? 0 : 1,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan.",
      data: {
        id: result.insertId,
      },
    });
  } catch (err) {
    console.error("Add product error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk.",
    });
  }
});

// =========================
// UPDATE PRODUCT
// =========================

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, category_id, description, stock, is_active } =
      req.body;

    if (!name || !price || !category_id || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, kategori, dan stok wajib diisi.",
      });
    }

    // Cek produk
    const [products] = await db.execute(
      "SELECT id, image FROM products WHERE id = ?",
      [id],
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    const oldImage = products[0].image;

    // Kalau tidak upload gambar baru,
    // gunakan gambar lama
    const image = req.file ? req.file.filename : oldImage;

    await db.execute(
      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        image = ?,
        stock = ?,
        category_id = ?,
        is_active = ?
      WHERE id = ?
      `,
      [
        name,
        description || null,
        price,
        image,
        stock,
        category_id,
        is_active === "false" ? 0 : 1,
        id,
      ],
    );

    res.json({
      success: true,
      message: "Produk berhasil diperbarui.",
    });
  } catch (err) {
    console.error("Update product error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui produk.",
    });
  }
});

// =========================
// TOGGLE PRODUCT STATUS
// =========================

router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (is_active === undefined) {
      return res.status(400).json({
        success: false,
        message: "Status produk wajib dikirim.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE products
      SET is_active = ?
      WHERE id = ?
      `,
      [is_active ? 1 : 0, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      message: is_active
        ? "Produk berhasil diaktifkan."
        : "Produk berhasil dinonaktifkan.",
    });
  } catch (err) {
    console.error("Toggle product error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal mengubah status produk.",
    });
  }
});

// =========================
// DELETE PRODUCT
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah produk ada
    const [products] = await db.execute(
      "SELECT id, name, image FROM products WHERE id = ?",
      [id],
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    // Cek apakah produk sudah pernah digunakan dalam order
    const [orderItems] = await db.execute(
      `
      SELECT id
      FROM orders_items
      WHERE product_id = ?
      LIMIT 1
      `,
      [id],
    );

    if (orderItems.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "Produk tidak dapat dihapus karena sudah digunakan dalam pesanan.",
      });
    }

    // Hapus produk
    await db.execute("DELETE FROM products WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Produk berhasil dihapus.",
    });
  } catch (err) {
    console.error("Delete product error:", err);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus produk.",
    });
  }
});

module.exports = router;
