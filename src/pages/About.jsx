import { useState, useEffect } from 'react'
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About Lorax Gains</h1>

      <p>
        Welcome to Lorax Gains — your ultimate fitness partner.
        Our mission is to help beginners, experienced athletes,
        and professional bodybuilders achieve their dream physique.
      </p>

      <div className="learning-section">
        <div className="card">
          <h2>Beginner Training</h2>
          <p>
            Learn proper workout routines, stretching, and nutrition.
          </p>
        </div>

        <div className="card">
          <h2>Experienced Training</h2>
          <p>
            Improve strength, endurance, and advanced workout techniques.
          </p>
        </div>

        <div className="card">
          <h2>Professional Training</h2>
          <p>
            Master bodybuilding, cutting, bulking, and elite-level programs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;