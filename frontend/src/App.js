// Importing necessary styles and components
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/ProductDetails'
import LoginSignup from './components/Authentication/LoginSignup';
import { useEffect, useState } from 'react';
import { reloadUserSlice } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import ChangePassword from './components/Authentication/ChangePassword';
import Shipping from './components/Shipping/Shipping';
import ConfirmOrder from './components/Shipping/ConfirmOrder.jsx';
import OrderPayment from './components/Shipping/OrderPayment.jsx';

// Main App component
function App() {
  // Initializing the Redux dispatch function
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState('')

  // Fetching user authentication status from the Redux store
  const { isAuthenticated } = useSelector(state => state.user);
  
  //Fetch Stripe API key
  const getStripeAPI = async () =>{
    try{const jsonData = await fetch('http://localhost:5000/api/v1/getStripeApiKey',{
      credentials:'include'
    })
    const data = await jsonData.json()
    setStripeApiKey(data.stripeApiKey)}catch(err){
      console.log(err)
    }
  }

  // Effect to reload user data when the component mounts
  useEffect(() => {
    dispatch(reloadUserSlice());
    getStripeAPI()
  }, [dispatch]);

  // Rendering the application
  return (
    <Router>
      <div className="App min-h-screen">
        {/* Header component for navigation */}
        <Header />
        
        {/* Notification toaster component */}
        <Toaster />

        {/* Routing configuration */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/productDetails/:_id' element={<ProductDetails />} />
          <Route path='/login' element={<LoginSignup />} />

          {/* Protected routes accessible only if the user is authenticated */}
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/account' element={<Profile />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/confirmOrder' element={<ConfirmOrder />} />
            <Route path='/process/payment' element={<OrderPayment stripeApiKey={stripeApiKey}/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// Exporting the App component
export default App;