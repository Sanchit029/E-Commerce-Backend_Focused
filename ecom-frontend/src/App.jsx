import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NavButtons from "./components/NavButtons";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";
import AdminDashboard from "./components/AdminDashboard";
import Modal from "./components/Modal";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [productForm, setProductForm] = useState({
    name: "",
    image: "",
    price: "",
    desc: "",
    category: "",
  });
  const [view, setView] = useState("login"); // 'login', 'register', 'products'
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    if (token) {
      setLoading(true);
      setError("");
      Promise.all([
        axios.get(`${API}/api/products`, { headers: { Authorization: token } }),
        axios.get(`${API}/api/cart`, { headers: { Authorization: token } })
      ])
        .then(([productsRes, cartRes]) => {
          setProducts(productsRes.data);
          setCart(cartRes.data);
          setView("products");
        })
        .catch(() => {
          setProducts([]);
          setCart([]);
          setError("Failed to load data. Please try again.");
        })
        .finally(() => setLoading(false));
    } else {
      setView("login");
    }
  }, [token]);

  // Register
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/api/users/register`, form);
      alert("Registered! Now login.");
      setView("login");
    } catch (err) {
      setError("Registration failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/api/users/login`, loginForm);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token); // Save token to localStorage
      setView("products");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/api/products`, productForm, {
        headers: { Authorization: token },
      });
      const res = await axios.get(`${API}/api/products`, {
        headers: { Authorization: token },
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Edit product handler
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setProductForm({
      name: product.name,
      image: product.image,
      price: product.price,
      desc: product.description || product.desc || "",
      category: product.category,
    });
  };

  // Update product (PUT)
  const updateProduct = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setLoading(true);
    setError("");
    try {
      await axios.put(
        `${API}/api/products/${editProduct._id}`,
        productForm,
        { headers: { Authorization: token } }
      );
      setEditProduct(null);
      setProductForm({ name: "", image: "", price: "", desc: "", category: "" });
      const res = await axios.get(`${API}/api/products`, {
        headers: { Authorization: token },
      });
      setProducts(res.data);
    } catch (err) {
      setError("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API}/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Logout function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setProducts([]);
    setView("login");
  };

  // Add to cart (backend)
  const addToCart = async (product) => {
    setLoading(true);
    setError("");
    try {
      const existing = cart.find((item) => item._id === product._id);
      if (existing) {
        await axios.post(
          `${API}/api/cart/${existing._id}`,
          {},
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          `${API}/api/cart`,
          { name: product.name, price: product.price, quantity: 1 },
          { headers: { Authorization: token } }
        );
      }
      const res = await axios.get(`${API}/api/cart`, {
        headers: { Authorization: token },
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  // Remove from cart (decrement or remove)
  const removeFromCart = async (id) => {
    setLoading(true);
    setError("");
    try {
      await axios.post(
        `${API}/api/cart/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      const res = await axios.get(`${API}/api/cart`, {
        headers: { Authorization: token },
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to remove from cart.");
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API}/api/cart`, {
        headers: { Authorization: token },
      });
      setCart([]);
    } catch (err) {
      setError("Failed to clear cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <span className="nav-title">E-Commerce App</span>
        <div className="nav-actions">
          {token && view === "products" && !showAdmin && (
            <>
              <button onClick={() => setShowCart(true)}>Cart</button>
              <button onClick={() => setShowCheckout(true)}>Checkout</button>
              <button onClick={() => setShowAdmin((v) => !v)}>
                Admin
              </button>
            </>
          )}
          {token && (
            <button onClick={logout} className="logout-btn" style={{margin:0}}>Logout</button>
          )}
        </div>
      </nav>
      <div className="container">
        {loading && <div className="spinner" />}
        {error && <div className="error-message">{error}</div>}
        {!token && <NavButtons view={view} setView={setView} />}
        {view === "register" && !token && (
          <RegisterForm form={form} setForm={setForm} register={register} />
        )}
        {view === "login" && !token && (
          <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} login={login} />
        )}
        {token && view === "products" && (
          <div>
            {showAdmin ? (
              <AdminDashboard token={token} />
            ) : (
              <>
                <ProductForm
                  productForm={productForm}
                  setProductForm={setProductForm}
                  addProduct={editProduct ? updateProduct : addProduct}
                  isEdit={!!editProduct}
                  cancelEdit={() => {
                    setEditProduct(null);
                    setProductForm({ name: "", image: "", price: "", desc: "", category: "" });
                  }}
                />
                <ProductList
                  products={products}
                  deleteProduct={deleteProduct}
                  addToCart={addToCart}
                  onEdit={handleEditProduct}
                />
                <button onClick={() => setShowCart(true)} style={{ marginTop: 10, backgroundColor: '#2563eb' }}>View Cart</button>
                <Modal open={showCart} onClose={() => setShowCart(false)}>
                  <div className="cart">
                    <h2>Cart</h2>
                    <ul>
                      {cart.map((item) => (
                        <li key={item._id} style={{color:"black"}}>
                          {item.name} - ${item.price} x {item.quantity}
                          <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                    <div style={{ fontWeight: "bold", marginTop: 10 , color:"black" }}>
                      Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                    </div>
                    <button onClick={clearCart} style={{ marginTop: 10 }}>Clear Cart</button>
                    <button onClick={() => setShowCheckout(true)} style={{ marginTop: 10, backgroundColor: '#28a745' }}>Checkout</button>
                    {showCheckout && <CheckoutForm onClose={() => setShowCheckout(false)} />}
                  </div>
                </Modal>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
