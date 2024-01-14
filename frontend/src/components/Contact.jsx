import React from 'react';
import {FaGithub, FaLinkedin} from 'react-icons/fa6'

const Contact = () => {
  return (
    <div className="bg-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Get in Touch</h1>
        <p className="mb-4">
          Hello! I'm Navjot Sherry, a skilled and passionate full-stack JavaScript developer. If you're looking for someone who can bring your ideas to life and build robust, scalable applications, you're in the right place.
        </p>
        <p className="mb-4">
          With expertise in the MERN stack and a range of features like pagination, order placement, payment processing, and admin dashboard implementation, I've demonstrated my commitment to delivering comprehensive solutions for a seamless user experience.
        </p>
        <p className="mb-4">
          I'm not just a developer; I'm a problem solver and a creative thinker. My projects are a testament to my dedication to staying on the cutting edge of technology while ensuring a user-friendly design.
        </p>
        <p className="mb-4">
          Ready to collaborate? Connect with me on LinkedIn and explore my GitHub repositories to see the magic unfold. Let's turn your ideas into reality!
        </p>

        {/* LinkedIn and GitHub links */}
        <div className="flex space-x-4 justify-end">
          <a href="https://www.linkedin.com/in/navjotsherry/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-7xl animate-bounce hover:text-black duration-300"><FaLinkedin/></a>
          <a href="https://github.com/navjotsherry" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-7xl animate-bounce hover:text-black duration-300"><FaGithub/></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
