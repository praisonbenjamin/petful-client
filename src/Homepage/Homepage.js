import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
  return (
    <section className="about-section">
      <div className="hero-content">
        <h2>Welcome to the FIFO Petful adoption center!</h2>
        <p>
          We are a first-come-first-serve practicing agency. This means that you
          will be able to adopt the pets that are in front of the line if 
          nobody is in front of you!{' '}
        </p>
        <p>
          Click the button below to see the pets
          currently looking for a home and to get in the line to adopt!
        </p>
      </div>
      <Link to={'/adoption'}>Adopt a pet</Link>
    </section>
  );
}