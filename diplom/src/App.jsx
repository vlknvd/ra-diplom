import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import CardProductPage from './pages/CardProductPage';
import CartPage from './pages/CartPage';

function App() {
  return(
    <div>
      <Header />
      <Banner>
        <Routes>
          <Route path="/about.html" element={<AboutPage />}/>
          <Route path="/catalog/:id" element={<CardProductPage />} />
          <Route path="/contacts.html" element={<ContactsPage />} />
          <Route path="/catalog.html" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/*" element={<Page404 />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Banner>
      <Footer />
    </div>
      
  )
}

export default App