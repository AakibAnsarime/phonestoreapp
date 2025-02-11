import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Collection from './components/Collection';
import LatestProducts from './components/LatestProducts';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Facility from './components/Facility';
import PhoneNews from './components/PhoneNews';
import Reviews from './components/Reviews';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Collection />
                <LatestProducts />
                <Facility />
                <Reviews />
                <PhoneNews />
              </>
            } />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;