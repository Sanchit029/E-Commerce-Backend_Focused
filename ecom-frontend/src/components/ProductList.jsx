import React from "react";

const ProductList = ({ products, deleteProduct, addToCart, onEdit }) => (
  <div className="card">
    <h2>Products</h2>
    <ul className="product-list">
      {products.map((p) => (
        <li key={p._id} className="product-item">
          <div>
            <b>{p.name}</b> - ${p.price}
            <br />
            <img src={p.image} className="image-disp" alt="Test-Image" />
          </div>
          <button onClick={() => addToCart(p)} className="">Add To Cart</button>
          <button onClick={() => onEdit && onEdit(p)} style={{ marginRight: 8 }}>Edit</button>
          <button onClick={() => deleteProduct(p._id)} className="delete-btn">Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
