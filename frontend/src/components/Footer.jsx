import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin , FaGithub} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-primary p-2 mt-4 w-full text-black py-4">
        <div className="w-full mx-auto my-3 flex items-center justify-center">
            <div className="text-4xl mx-auto">AMAZOON © </div>
        </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">About Me</h2>
            <p>Embark on a journey through the digital realm with <Link to={'/about'}>Navjot Sherry's</Link> portfolio — where innovation meets code, and ideas come to life.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Contact Us</h2>
            <p>Email: <a href={"mailto:navjotsherryy@gmail.com"}>navjotsherryy@gmail.com</a></p>
            <p>Phone: +1 123 456 7890</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Links</h2>
            <ul>
              <li><Link to="/" className="text-secondary hover:underline">Home</Link></li>
              <li><Link to="/products" className="text-secondary hover:underline">Products</Link></li>
              <li><Link to="/about" className="text-secondary hover:underline">About</Link></li>
              <li><Link to="/contact" className="text-secondary hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Follow Me:</h2>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/navjotsherry/" target='_blank' className="text-black text-3xl mx-2 hover:text-primary rounded-md duration-300 hover:bg-black">
                <FaLinkedin/>
              </a>
              <a href="https://www.github.com/navjotsherry/" target='_blank' className="text-black text-3xl mx-2 hover:text-primary rounded-full duration-300 hover:bg-black">
                <FaGithub/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;