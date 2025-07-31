import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="app">
      <header>
        <h1>My E-Commerce Store</h1>
      </header>

      <main>
        {selectedId
          ? <ProductDetail productId={selectedId} back={() => setSelectedId(null)} />
          : <ProductList selectProduct={id => setSelectedId(id)} />
        }
      </main>

      <footer>
        © {new Date().getFullYear()} My Store
      </footer>
    </div>
  );
}

export default App;
