import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Product from './components/Product'
import {  Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout'
import BuyTokens from './components/BuyTokens';
import AllProducts from './components/AllProducts';
import ProfilePage from './components/Profile';

import ContractState from './components/context/smartContract/contractstate';
import UserState from './components/context/user/userState';

function App() {
  return (
    <>
      <ContractState>
        <UserState>
      <Router>
        <Header/>
        <Routes>

        <Route exact path="/" element={<Home/>} />
        <Route exact path="/allProducts" element={<AllProducts/>} /> 
        <Route exact path="/products" element={<Product/>}/>
        <Route exact path="/products/:id" element={<ProductDetail/>} />
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<BuyTokens/>} />
        <Route exact path="/profile" element={<ProfilePage/>} />
        </Routes>
        <Footer/> 
      </Router>
      </UserState>
      </ContractState>
     </>
  );
}

export default App;


// 
        
        
        // 
        //  />
        // 
        // 
        // */}
        // {/* <Redirect to="/" /> */}
        // {/* */}