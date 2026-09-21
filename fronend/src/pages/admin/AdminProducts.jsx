import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import "../../styles/admin/AdminProducts.css";
import API_URL from "../../config/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    stock: "",
    is_active: true,
  });

  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();

      console.log("PRODUCTS:", data);

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil produk.");
      }

      setProducts(data.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      is_active: e.target.value === "true",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Ukuran gambar maksimal 5MB.");
      return;
    }
    setImage(file);
    setFormError("");
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      price: product.price || "",
      category_id: product.category_id || "",
      description: product.description || "",
      stock: product.stock ?? "",
      is_active: product.is_active ? true : false,
    });

    setImage(null);
    setFormError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setFormError("");

    try {
      if (
        !formData.name ||
        !formData.price ||
        !formData.category_id ||
        formData.stock === ""
      ) {
        throw new Error("Nama, harga, kategori, dan stok wajib diisi.");
      }

      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category_id", formData.category_id);
      data.append("description", formData.description);
      data.append("stock", formData.stock);
      data.append("is_active", formData.is_active);

      if (image) {
        data.append("image", image);
      }

      const url = editingProduct
        ? `${API_URL}/api/admin/products/${editingProduct.id}`
        : `${API_URL}/api/admin/products`;

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: data,
      });

      const result = await response.json();

      console.log(editingProduct ? "UPDATE PRODUCT:" : "ADD PRODUCT:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
            (editingProduct
              ? "Gagal memperbarui produk."
              : "Gagal menambahkan produk."),
        );
      }

      alert(
        editingProduct
          ? "Produk berhasil diperbarui."
          : "Produk berhasil ditambahkan.",
      );

      setFormData({
        name: "",
        price: "",
        category_id: "",
        description: "",
        stock: "",
        is_active: true,
      });

      setImage(null);
      setEditingProduct(null);
      setShowForm(false);

      fetchProducts();
    } catch (error) {
      console.error(
        editingProduct ? "Update product error:" : "Add product error:",
        error,
      );

      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/products/${product.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            is_active: !product.is_active,
          }),
        },
      );

      const result = await response.json();

      console.log("TOGGLE STATUS:", result);

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengubah status produk.");
      }

      fetchProducts();
    } catch (error) {
      console.error("Toggle status error:", error);

      alert(error.message);
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus produk "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );

      const result = await response.json();

      console.log("DELETE PRODUCT:", result);

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus produk.");
      }

      alert("Produk berhasil dihapus.");

      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader />

        <section className="admin-content">
          <div className="products-header">
            <div>
              <span>PRODUCT MANAGEMENT</span>
              <h2>Products</h2>
              <p>Kelola daftar produk kopi dan minuman yang tersedia.</p>
            </div>

            <button
              className="add-product-button"
              onClick={() => {
                setShowForm(true);
                setFormError("");
              }}
            >
              + Tambah Produk
            </button>
          </div>

          {showForm && (
            <div className="product-form-card">
              <div className="product-form-header">
                <div>
                  <span>{editingProduct ? "EDIT PRODUCT" : "NEW PRODUCT"}</span>
                  <h3>{editingProduct ? "Edit Produk" : "Tambah Produk"}</h3>
                </div>

                <button
                  type="button"
                  className="close-form-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setFormError("");
                  }}
                >
                  ×
                </button>
              </div>

              {formError && (
                <div className="product-form-error">{formError}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="product-form-grid">
                  <div className="form-group">
                    <label>Nama Produk</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Kopi Kenangan Senja"
                    />
                  </div>

                  <div className="form-group">
                    <label>Harga</label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Contoh: 25000"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Kategori</label>

                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                    >
                      <option value="">Pilih kategori</option>

                      <option value="1">Coffee</option>

                      <option value="2">Non Coffee</option>

                      <option value="3">Latte</option>

                      <option value="4">Matcha</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Stok</label>

                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Contoh: 20"
                      min="0"
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label>Deskripsi</label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Deskripsi produk..."
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label>Gambar Produk</label>

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleImageChange}
                    />

                    <small>JPG, JPEG, PNG, WEBP — maksimal 5MB</small>
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      value={formData.is_active}
                      onChange={handleStatusChange}
                    >
                      <option value="true">Aktif</option>

                      <option value="false">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div className="product-form-actions">
                  <button
                    type="button"
                    className="cancel-form-button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                      setFormError("");
                    }}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="save-product-button"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan Produk"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="products-table-wrapper">
            {loading ? (
              <div className="products-loading">Memuat produk...</div>
            ) : products.length === 0 ? (
              <div className="products-empty">Belum ada produk.</div>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Stok</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <div className="product-no-image">No Image</div>
                          )}

                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.description || "-"}</span>
                          </div>
                        </div>
                      </td>

                      <td>{product.category_name || "-"}</td>

                      <td>
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </td>

                      <td>{product.stock}</td>

                      <td>
                        <button
                          className={
                            product.is_active
                              ? "status-button status-active"
                              : "status-button status-inactive"
                          }
                          onClick={() => handleToggleStatus(product)}
                        >
                          {product.is_active ? "Aktif" : "Nonaktif"}
                        </button>
                      </td>

                      <td>
                        <div className="product-actions">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() => handleDelete(product)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminProducts;
