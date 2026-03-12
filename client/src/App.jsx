import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' 
import './App.css'
import Header from './components/header.jsx'
import Home from './components/home.jsx'
import Footer from './components/footer.jsx'
import CatalogComp from './components/catalog-comp.jsx'
import Product from './components/product.jsx'
import Profile from './components/profile.jsx'

function App() {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ loggedIn: true }); 
    }
  }, []);

  return (
    <div className="app-container">
      <Header user={user} setUser={setUser}/>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogComp />} />
          <Route path="/product" element={<Product />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App;
