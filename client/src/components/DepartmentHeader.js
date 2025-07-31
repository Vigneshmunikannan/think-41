// src/components/DepartmentHeader.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartment } from '../api';

export default function DepartmentHeader() {
  const { deptId } = useParams();
  const [dep, setDep] = useState(null);

  useEffect(() => {
    getDepartment(deptId).then(setDep);
  }, [deptId]);

  if (!dep) return null;

  return (
    <div style={{marginTop: 20, marginBottom: 20}}>
      <h2>{dep.name} ({dep.product_count} products)</h2>
    </div>
  );
}
