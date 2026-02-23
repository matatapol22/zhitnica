import { useState } from 'react'
import { Routes, Route } from 'react-router-dom' 
import './App.css'
import Header from './components/header.jsx'
import Home from './components/home.jsx'
import Footer from './components/footer.jsx'
import CatalogComp from './components/catalog-comp.jsx'
import Product from './components/product.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogComp />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;
