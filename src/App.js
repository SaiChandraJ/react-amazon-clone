import './App.css';
import Header from './components/header';
import Cart from './components/cart';
import Home from './components/home';
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Login from './components/login';
import { signOut } from "firebase/auth";
import ProductDetail from './components/productDetail';
import ErrorPage from './components/error';

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
      const prodCollection = collection(db, 'products');
      onSnapshot(prodCollection, (snapshot) => {
        const prodList = snapshot.docs.map((doc) => ({id: doc.id, product: doc.data()}));
        setProducts(prodList);
      });
  };

  useEffect(() => {
      getProducts();
  }, []);

  const signingOut = () => {
    signOut(auth).then(() => {
        localStorage.removeItem('user');
        setUser(null);
      }).catch((error) => {
        alert(error.message);
    });
  };

  useEffect(() => {
    const getCartItems = () => {
      const cartItemsCollection = collection(db, `${user.email.split('@')[0]}_cartItems`);
      onSnapshot(cartItemsCollection, (snapshot) => {
        const cartItemsList = snapshot.docs.map((doc) => ({id: doc.id, product: doc.data()}));
        setCartItems(cartItemsList);
      });
    };
    if(user){
      getCartItems();
    }
  }, [user])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header cartItems={cartItems} user={user} signingOut={signingOut} />,
      children: [
        {index: "true", element: <Home user={user} products={products} />, loader: () => (!user ? redirect('/login') : null)},
        {path: "/cart", element: <Cart user={user} cartItems={cartItems} products={products} />, loader: () => (!user ? redirect('/login') : null)},
        {path: "/productDetail/:productID" , element: <ProductDetail products={products} cartItems={cartItems} user={user} />, errorElement: <div style={{color: "#7F7F7F", textAlign: "center", fontSize: "50px", fontWeight: "600", marginTop: "30px", fontFamily: "dewave"}}>Product Details not Available!!!</div> ,loader: () => (!user ? redirect('/') : null)},
      ],
    },
    {path: "/login", element: <Login setUser={setUser} />, loader: () => (user ? redirect('/') : null)},
    {path: '*', element: <ErrorPage />}
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
