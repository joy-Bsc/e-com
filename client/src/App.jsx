import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductByBrand from './pages/ProductByBrand';
import ProductByCategory from './pages/ProductByCategory';
import ProductByKeyword from './pages/ProductByKeyword';
import ProductDetails from './pages/ProductDetails';
import AboutPage from './pages/about-page';
import RefundPage from './pages/RefundPage';
import PrivacyPage from './pages/PrivacyPage';
import HowToBuyPage from './pages/HowToBuyPage';
import ContactPage from './pages/ContactPage';
import ComplainPage from './pages/ComplainPage';
import LoginPage from './pages/LoginPage';
import OTPPage from './pages/OTPPage';
import ProfilePage from './pages/ProfilePage';
import WishListPage from './pages/WishListPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import InvoicePage from './pages/InvoicePage';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/by-brand/:id' element={<ProductByBrand/>}></Route>
      <Route path='/by-category/:id' element={<ProductByCategory/>}></Route>
      <Route path='/by-keyword/:keyword' element={<ProductByKeyword/>}></Route>
      <Route path='/details/:id' element={<ProductDetails/>}></Route>
      <Route path='/about' element={<AboutPage/>}></Route>
      <Route path='/refund' element={<RefundPage/>}></Route>
      <Route path='/privacy' element={<PrivacyPage/>}></Route>
      <Route path='/how-to-buy' element={<HowToBuyPage/>}></Route>
      <Route path='/contact' element={<ContactPage/>}></Route>
      <Route path='/complain' element={<ComplainPage/>}></Route>

       
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/otp' element={<OTPPage/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route> 

      <Route path='/wish' element={<WishListPage/>}></Route> 
      <Route path='/cart' element={<CartPage/>}></Route>

      <Route path='/order' element={<OrderPage/>}></Route>
      <Route path='/invoice/:id' element={<InvoicePage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;