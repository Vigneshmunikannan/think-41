// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import DepartmentHeader from './components/DepartmentHeader';
import './App.css'; // Assuming you have some global styles
export default function App() {
  return (
    <BrowserRouter>
      <h1>E-commerce Departments</h1>
      <DepartmentList />
      <Routes>
        <Route path="/" element={<Navigate to="/departments" />} />
        <Route path="/departments" element={<ProductList />} />
        <Route path="/departments/:deptId" element={
          <>
            <DepartmentHeader />
            <ProductList />
          </>
        } />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
