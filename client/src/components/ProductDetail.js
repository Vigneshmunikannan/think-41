import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ProductDetail.css';

function ProductDetail({ productId, back }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(res => setProduct(res.data.item))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <article className="detail-card">
      <button className="back-btn" onClick={back}>← Back to list</button>

      <div className="detail-grid">
        {/* <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} /> */}
        <div className="info">
          <h2>{product.name}</h2>
          <p className="price">${product.retail_price.toFixed(2)}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Department:</strong> {product.department}</p>
          <p><strong>Description:</strong></p>
          <p>{product.description || 'No description available.'}</p>
        </div>
      </div>
    </article>
  );
}

export default ProductDetail;
