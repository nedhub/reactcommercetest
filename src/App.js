import React, { useState, useEffect} from 'react';
import './App.css';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
// import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';




function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();


    setProducts(data);
  }


  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();


    setCart(cart)
  }


  const handleAddToCart = async (productId, quantity) => {

    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);

  }


  const handleUpdateCartQty = async (productId, quantity ) => {

    const response = await commerce.cart.update(productId, { quantity});

    setCart(response.cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const remove = await commerce.cart.remove(productId);

    setCart(remove.cart);
  }


  const handleEmptyCart = async () => {

    const empty = await commerce.cart.empty();



    setCart(empty.cart);
  }


  useEffect(() => {


    fetchProducts();
    fetchCart();



  }, []);


  








  return (

    <Router>


    
    <div className="App">

      <Navbar totalItems={cart.total_items} />
      <Switch>


        <Route exact path="/">

        <Products products={products} onAddToCart={handleAddToCart}/>



        </Route>

        <Route exact path="/cart">
        <Cart 
        cart={cart}
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveFromCart={handleRemoveFromCart}
        handleEmptyCart={handleEmptyCart} />

        </Route>


        <Route exact path="/checkout">


          {/* <Checkout /> */}



        </Route>


      

      



      </Switch>
      
      
    </div>

    </Router>
  );
}

export default App;
