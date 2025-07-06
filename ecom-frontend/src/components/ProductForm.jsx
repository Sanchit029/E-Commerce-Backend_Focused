import React from "react";

const ProductForm = ({ productForm, setProductForm, addProduct }) => (
  <div className="card">
    <h2>Add Product</h2>
    <form onSubmit={addProduct} className="form">
        <label htmlFor="Name">Name</label>
      <input
        placeholder="Name"
        value={productForm.name}
        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
      />
      <label htmlFor="Image URL">Image URL</label>
      <input
        placeholder="Image URL"
        value={productForm.image}
        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
      />
      <label htmlFor="Price">Price</label>
      <input
        placeholder="Price"
        type="number"
        value={productForm.price}
        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
      />
      <label htmlFor="Description">Description</label>
      <input
        placeholder="Description"
        value={productForm.desc}
        onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
      />
      <label htmlFor="Categoty">Category</label>
      <input
        placeholder="Category"
        value={productForm.category}
        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
      />
      <button type="submit">Add</button>
    </form>
  </div>
);

export default ProductForm;
