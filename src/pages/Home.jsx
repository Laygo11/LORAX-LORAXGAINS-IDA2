import './Home.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

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
  const [progress, setProgress] = useState(0)

  // Progress popup state
  const [showProgress, setShowProgress] = useState(false)
  const progressTimerRef = useRef(null)

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
    setTimeout(() => setShowQuote(true), 300)
    setTimeout(() => setShowQuote(false), 5000)

    const surveyCompleted = localStorage.getItem("surveyCompleted")
    if (!surveyCompleted) {
      setTimeout(() => setShowSurvey(true), 1000)
    }
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const unlockedDay = Number(localStorage.getItem("unlockedDay")) || 0
      const profile = JSON.parse(localStorage.getItem("fitnessProfile"))
      const totalDays =
        profile?.days === "1-2" ? 2
        : profile?.days === "3-4" ? 4
        : profile?.days === "5+" ? 5
        : 3
      setProgress((unlockedDay / totalDays) * 100)
    }
    updateProgress()
    window.addEventListener("storage", updateProgress)
    return () => window.removeEventListener("storage", updateProgress)
  }, [])

  const handleProgressClick = () => {
    if (showProgress) return
    setShowProgress(true)
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current)
    progressTimerRef.current = setTimeout(() => {
      setShowProgress(false)
    }, 10000)
  }

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
            <p>Answer a few quick questions so we can create your workout and meal plan based on your goals.</p>
            <button className="survey-btn" onClick={() => navigate("/survey")}>
              Start Fitness Survey →
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="hero">
        <div className="hero-accent" />

        <p className="eyebrow">Free · No Gym · No Excuses</p>

        <h1 className="hero-title">
          FREE WORKOUT<br />
          <span className="hero-title-accent">FOR STUDENTS</span>
        </h1>

        <p className="hero-sub">
          No gym? No problem. No money? Even better.<br />It's all free, forever.
        </p>

        {/* PROGRESS SECTION — stacks button, popup, and reset vertically */}
        <div className="progress-section">

          {/* PROGRESS BUTTON */}
          <button className="progress-btn" onClick={handleProgressClick}>
            <span className="progress-btn-label">THIS WEEK'S GOAL</span>
            <span className="progress-btn-pct">{Math.round(progress)}%</span>
            <span className="progress-btn-hint">tap to view →</span>
          </button>

          {/* PROGRESS POPUP */}
          {showProgress && (
            <div className="progress-popup">
              <div className="progress-popup-header">
                <span className="progress-popup-title">WEEKLY PROGRESS</span>
                <span className="progress-popup-pct">{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-popup-sub">
                {progress === 0
                  ? "Start your first workout to track progress."
                  : progress >= 100
                  ? "Week complete! You crushed it 💪"
                  : `You're ${Math.round(progress)}% through your weekly plan. Keep pushing!`}
              </p>
              <div className="progress-popup-timer">
                Closes in 10s
              </div>
            </div>
          )}

          {/* RESET BUTTON */}
          <button className="reset-btn" onClick={resetSurvey}>
            Reset Survey
          </button>

        </div>
      </div>

      {/* FEATURES */}
      <div className="features">

        <div className="feature">
          <div className="feature-icon">🏋️</div>
          <span className="feature-badge">POPULAR</span>
          <h3>Workout Generator</h3>
          <p>Pick your goal, get a plan instantly. No gym required.</p>
          <button className="survey-btn" onClick={() => navigate("/workout")}>
            Check Out Workout Generator →
          </button>
        </div>

        <div className="feature">
          <div className="feature-icon">🥗</div>
          <span className="feature-badge feature-badge--mid">NUTRITION</span>
          <h3>Food Lookup</h3>
          <p>See calories, protein, and carbs for any meal you eat.</p>
          <button className="survey-btn" onClick={() => navigate("/ingredients")}>
            Check Out Food Lookup →
          </button>
        </div>

        <div className="feature">
          <div className="feature-icon">🎓</div>
          <span className="feature-badge feature-badge--gold">FREE</span>
          <h3>100% Free</h3>
          <p>No subscription. No paywall. Just results and discipline.</p>
          <button className="survey-btn" onClick={() => navigate("/about")}>
            Learn More →
          </button>
        </div>

      </div>

    </div>
  )
}
