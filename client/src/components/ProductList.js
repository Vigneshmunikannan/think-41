// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProducts } from '../api';

export default function ProductList() {
  const { deptId } = useParams();
  const [products, setProducts] = useState([]);
  const [pageData, setPageData] = useState({page: 1, totalPages: 1, totalItems: 0});
  const navigate = useNavigate();
  const location = useLocation();

  // Read ?page= query
  const qp = new URLSearchParams(location.search);
  const pageQ = parseInt(qp.get('page') || '1', 10);

  useEffect(() => {
    const params = { page: pageQ, limit: 10 };
    if (deptId) params.departmentId = deptId;
    getProducts(params).then(data => {
      setProducts(data.items);
      setPageData({page: data.page, totalPages: data.totalPages, totalItems: data.totalItems});
    });
  }, [deptId, pageQ]);

  const gotoPage = (n) => {
    navigate(`${location.pathname}?page=${n}`);
  };

  return (
    <div>
      <ul>
        {products.length === 0 && <li>No products found.</li>}
        {products.map(prod => (
          <li key={prod._id || prod.id} onClick={() => navigate(`/products/${prod._id || prod.id}`)} style={{cursor: "pointer"}}>
            {prod.name} - ₹{prod.retail_price} ({prod.department?.name})
          </li>
        ))}
      </ul>
      <div>
        {pageData.page > 1 && (
          <button onClick={() => gotoPage(pageData.page - 1)}>Prev</button>
        )}
        <span> Page {pageData.page} of {pageData.totalPages} </span>
        {pageData.page < pageData.totalPages && (
          <button onClick={() => gotoPage(pageData.page + 1)}>Next</button>
        )}
      </div>
      <div>{pageData.totalItems} items found.</div>
    </div>
  );
}
