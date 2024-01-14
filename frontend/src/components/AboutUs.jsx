import React from 'react';
import {Link} from 'react-router-dom'

const AboutUs = () => {
  return (
    <div className="bg-white px-2 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">About Me</h1>
        <p className="mb-4">
          Hello, I'm <Link to={'/contact'}> Navjot Sherry</Link>, a passionate developer, and I welcome you to my portfolio project.
        </p>
        <p className="mb-4">
          This project is a showcase of my skills and creativity, bringing you a curated selection of high-quality products for all your needs.
        </p>
        <p className="mb-4">
          As a developer, I believe in delivering the best possible experience for users. Whether you're here for cutting-edge web applications, seamless user experiences, or innovative solutions, I've crafted this space with your tech aspirations in mind.
        </p>
        <p className="mb-4">
          Thank you for exploring my portfolio project. I hope you enjoy your time here. If you have any questions or feedback, feel free to <Link to="/contact">reach out</Link> to me. Let's make this journey together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
