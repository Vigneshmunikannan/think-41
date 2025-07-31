import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ProductList.css';

function ProductList({ selectProduct }) {
  const [products, setProducts] = useState([]);
  const [page, setPage]       = useState(1);
  const [totalPages, setTotal] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products?page=${page}&limit=12`)
      .then(res => {
        setProducts(res.data.items);
        setTotal(res.data.totalPages);
      })
      .catch(console.error);
  }, [page]);

  return (
    <section>
      <h2>Products</h2>

      <div className="grid">
        {products.map(p => (
          <div
            key={p._id}
            className="card"
            onClick={() => selectProduct(p._id)}
          >
            {/* <img src={p.imageUrl || 'https://via.placeholder.com/150'} alt={p.name} /> */}
            <h3>{p.name}</h3>
            <p className="price">${p.retail_price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >‹ Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >Next ›</button>
      </div>
    </section>
  );
}

export default ProductList;
