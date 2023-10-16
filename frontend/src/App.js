import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/ProductDetails'


function App() {
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
        </Routes>
      
    </div>

    </Router>
  );
}

export default App;
