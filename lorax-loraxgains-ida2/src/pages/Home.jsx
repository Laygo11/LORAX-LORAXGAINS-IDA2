import './Home.css'
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div id="home">

      <div className="hero">
        <h1>
          FREE WORKOUT PLANS <span>FOR STUDENTS</span>
        </h1>
        <p>No gym? No problem. No money? Even better. It's all free.</p>

        {/* SURVEY CARD */}
        <div className="survey-card">
          <h3>Get a Personalized Plan</h3>
          <p>
            Answer a few quick questions and we’ll build your workout + meal plan.
          </p>

          <button
            className="survey-btn"
            onClick={() => navigate("/survey")}
          >
            Start Fitness Survey →
          </button>
        </div>

        <div className="progress-card">
          <h4>This week’s goal</h4>
          <div className="score">4 / 5</div>
          <div className="bar"><span style={{ width: '80%' }}></span></div>
          <div className="bar"><span style={{ width: '60%' }}></span></div>
          <div className="bar"><span style={{ width: '40%' }}></span></div>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">🏋️</div>
          <h3>Workout Generator</h3>
          <p>Pick your goal, get a plan instantly.</p>
          <button
            className="survey-btn"
            onClick={() => navigate("/workout")}
          >
            Check Out Workout Generator →
          </button>
        </div>

        <div className="feature">
          <div className="feature-icon">🥗</div>
          <h3>Food Lookup</h3>
          <p>See calories, protein, carbs for meals.</p>
          <button
            className="survey-btn"
            onClick={() => navigate("/ingradients")}
          >
            Check Out Food Lookup →
          </button>
        </div>

        <div className="feature">
          <div className="feature-icon">🎓</div>
          <h3>100% Free</h3>
          <p>No subscription. Just results.</p>
          <button
            className="survey-btn"
            onClick={() => navigate("/about")}
          >
            Learn More →
          </button>
        </div>
      </div>

    </div>
  )
}