// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div style={{ border: '1px solid #aaa', padding: '1em', marginTop: '2em' }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>{product.name}</h3>
      <div><b>Brand:</b> {product.brand}</div>
      <div><b>Price:</b> ₹{product.retail_price}</div>
      <div><b>Cost:</b> ₹{product.cost}</div>
      <div><b>Department:</b> {product.department?.name}</div>
      <div><b>SKU:</b> {product.sku}</div>
      <div><b>Category:</b> {product.category}</div>
    </div>
  );
}
