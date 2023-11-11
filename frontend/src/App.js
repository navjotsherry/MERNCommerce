import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/ProductDetails'
import LoginSignup from './components/Authentication/LoginSignup';
import { useEffect } from 'react';
import { reloadUserSlice } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import ChangePassword from './components/Authentication/ChangePassword';
import Shipping from './components/Shipping/Shipping';
import ConfirmOrder from './components/Shipping/ConfirmOrder.jsx';


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(reloadUserSlice())
  },[dispatch])

  const {isAuthenticated} = useSelector(state => state.user)
  return (
    <Router>
       
    <div className="App min-h-screen">
      <Header/>  
      <Toaster/>
        <Routes>
          <Route path='/' element={<Home/>} />        
          <Route path='/products/:keyword' element={<Products/>} /> 
          <Route path='/products' element={<Products/>} /> 
          <Route path='/about' element={<AboutUs/>} />        
          <Route path='/contact' element={<Contact/>} />        
          <Route path='/cart' element={<Cart/>} />
          <Route path='/productDetails/:_id' element={<ProductDetails/>} /> 
          <Route path='/login' element={<LoginSignup/>} />
          
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
            <Route path='/account' element={<Profile/>} />
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/shipping' element={<Shipping/>}/>
            <Route path='/confirmOrder' element={<ConfirmOrder/>}/>
          </Route>
        </Routes>
      
    </div>

    </Router>
  );
}

export default App;
