import './Home.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {

  const navigate = useNavigate()

  const quotes = [
    "Keep going lad, keep motivated and disciplined everyday.",
    "Discipline beats motivation.",
    "Here again?? THATS GREAT!!!! KEEP GOING.",
    "In the end they'll judge you anyway so do what you want.",
    "Make yourself proud in the future.",
    "Your excuses are the reason nothing changes.",
    "Train now, thank yourself later."
  ]

  const [showQuote, setShowQuote] = useState(false)
  const [quote, setQuote] = useState("")
  const [showSurvey, setShowSurvey] = useState(false)

  useEffect(() => {

    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)]

    setQuote(randomQuote)

    setTimeout(() => {
      setShowQuote(true)
    }, 300)

    setTimeout(() => {
      setShowQuote(false)
    }, 5000)

    const surveyCompleted =
      localStorage.getItem("surveyCompleted")

    if (!surveyCompleted) {
      setTimeout(() => {
        setShowSurvey(true)
      }, 1000)
    }

  }, [])

  const startSurvey = () => {
    navigate("/survey")
  }

  // ✅ RESET SURVEY FUNCTION
  const resetSurvey = () => {
    localStorage.removeItem("surveyCompleted")
    setShowSurvey(true)
  }

  return (
    <div id="home">

      {/* MOTIVATION POPUP */}
      <div className={`motivation-popup ${showQuote ? "show" : ""}`}>
        💪 {quote}
      </div>

      {/* SURVEY POPUP */}
      {showSurvey && (
        <div className="survey-popup-overlay">

          <div className="survey-popup">

            <h2>Get Your Personalized Plan</h2>

            <p>
              Answer a few quick questions so we can create your
              workout and meal plan based on your goals.
            </p>

            <button
              className="survey-btn"
              onClick={startSurvey}
            >
              Start Fitness Survey →
            </button>

          </div>

        </div>
      )}

      {/* HERO SECTION */}
      <div className="hero">

        <h1>
          FREE WORKOUT PLANS <span>FOR STUDENTS</span>
        </h1>

        <p>
          No gym? No problem. No money? Even better. It's all free.
        </p>

        <div className="progress-card">

          <h4>This week’s goal</h4>

          <div className="score">4 / 5</div>

          <div className="bar">
            <span style={{ width: '80%' }}></span>
          </div>

          <div className="bar">
            <span style={{ width: '60%' }}></span>
          </div>

          <div className="bar">
            <span style={{ width: '40%' }}></span>
          </div>

        </div>

        {/* ✅ RESET BUTTON (MAIN PAGE) */}
        <button className="reset-btn" onClick={resetSurvey}>
          Reset Survey
        </button>

      </div>

      {/* FEATURES */}
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
            onClick={() => navigate("/ingredients")}
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