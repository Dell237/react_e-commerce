import React, { useEffect, useState } from 'react';
import {Products, Navbar, Cart, Checkout} from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';





const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () =>{
    const {data} = await commerce.products.list();

    setProducts(data);
  };
  
  const fetchCart = async () =>{
    setCart(await commerce.cart.retrieve());
  };
  
  const handleAddToCart = async (productId, quantity) => {
    const respone = await commerce.cart.add(productId, quantity);

    setCart(respone);
  };

  const handleUpdateCartQty = async (productId, quantity) =>{
    const respone = await commerce.cart.update(productId, {quantity});

    setCart(respone);
  };

  const handleRemoveFromCart = async (productId) =>{
    const respone = await commerce.cart.remove(productId);

    setCart(respone);
  }

  const handleEmptyCart = async () => {
    const respone = await commerce.cart.empty();

    setCart(respone);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() =>{
      fetchProducts();
      fetchCart();
  }, []);
  
  

  

  return (
   <Router>
      <div>
          <Navbar  totalItems={cart.total_items}/>
          <Routes>
            <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
            <Route 
            exact path="/cart"
              element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />}
            /> 
            <Route path="/checkout"
              element={
                <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}
              />}
            />
          </Routes>
          

      
      </div>
      </Router>
  )
}

export default App;