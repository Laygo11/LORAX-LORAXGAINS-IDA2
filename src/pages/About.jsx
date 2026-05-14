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

        {/* NEW YOUTUBE CARD */}
        <div className="card video-card">
          <h2>🎥 More Tutorials</h2>
          <p>
            Click below to watch video tutorials for proper form,
            workouts, and fitness guides.
          </p>

          <a
            href="https://youtu.be/U9ENCvFf9yQ?si=XqG69S6ZsrdXKp2X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="video-btn">
              Watch on YouTube
            </button>
          </a>
        </div>

      </div>
    </div>
  );
}

export default About;