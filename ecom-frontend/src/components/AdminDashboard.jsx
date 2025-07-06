import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5001";

const AdminDashboard = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    desc: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch products
  useEffect(() => {
    if (token) {
      axios
        .get(`${API}/api/products`, { headers: { Authorization: token } })
        .then((res) => setProducts(res.data));
    }
  }, [token]);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(
        `${API}/api/products/${editId}`,
        form,
        { headers: { Authorization: token } }
      );
    } else {
      await axios.post(`${API}/api/products`, form, {
        headers: { Authorization: token },
      });
    }
    setForm({ name: "", image: "", price: "", desc: "", category: "" });
    setEditId(null);
    const res = await axios.get(`${API}/api/products`, { headers: { Authorization: token } });
    setProducts(res.data);
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      image: product.image,
      price: product.price,
      desc: product.description || product.desc || "",
      category: product.category,
    });
    setEditId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/products/${id}`, {
      headers: { Authorization: token },
    });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ name: "", image: "", price: "", desc: "", category: "" }); }} style={{ background: '#aaa' }}>
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="card">
        <h2>All Products</h2>
        <ul className="product-list">
          {products.map((p) => (
            <li key={p._id} className="product-item">
              <div>
                <b>{p.name}</b> - ${p.price}
                <br />
                <img src={p.image} className="image-disp" alt="Product" />
                <div style={{ fontSize: 12 }}>{p.desc || p.description}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{p.category}</div>
              </div>
              <button onClick={() => handleEdit(p)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => handleDelete(p._id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
