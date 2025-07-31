// src/components/DepartmentList.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getDepartments } from '../api';

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(setDepartments);
  }, []);

  return (
    <nav>
      <NavLink to="/departments" style={{marginRight: '10px'}}>All Products</NavLink>
      {departments.map(dep => (
        <NavLink key={dep.id} to={`/departments/${dep.id}`} style={{marginRight: '10px'}}>
          {dep.name} ({dep.product_count})
        </NavLink>
      ))}
    </nav>
  );
}
