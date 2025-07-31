// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ProductList.css';

function ProductList({ selectProduct }) {
  const [products,   setProducts]   = useState([]);
  const [departments,setDepts]      = useState([]);
  const [page,       setPage]      = useState(1);
  const [totalPages, setTotal]     = useState(1);
  const [filterDept, setFilterDept]= useState('all');

  // fetch departments once
  useEffect(() => {
    axios.get('http://localhost:5000/api/departments')
      .then(res => setDepts(res.data))
      .catch(console.error);
  }, []);

  // fetch paginated products whenever page changes
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products?page=${page}&limit=12`)
      .then(res => {
        setProducts(res.data.items);
        setTotal(res.data.totalPages);
      })
      .catch(console.error);
  }, [page]);

  // apply frontend filter
  const visible = products.filter(p => {
    if (filterDept === 'all') return true;
    return p.department && p.department._id === filterDept;
  });

  return (
    <section>
      <h2>Products</h2>

      {/* Department filter */}
      <label>
        Filter by:
        <select
          value={filterDept}
          onChange={e => {
            setFilterDept(e.target.value);
            setPage(1);  // reset to first page on filter change
          }}
        >
          <option value="all">All Departments</option>
          {departments.map(d => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      {/* Product grid */}
      <div className="grid">
        {visible.map(p => (
          <div
            key={p._id}
            className="card"
            onClick={() => selectProduct(p._id)}
          >
            <h3>{p.name}</h3>
            <p className="price">${p.retail_price.toFixed(2)}</p>
            <small>{p.department?.name || 'No Dept'}</small>
          </div>
        ))}

        {visible.length === 0 && (
          <p>No products in this department.</p>
        )}
      </div>

      {/* Pagination controls */}
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
