import './Home.css'

export default function Home() {
  return (
    <div id="home">
      <div className="hero">
        <h1>FREE WORKOUT PLANS <span>FOR STUDENTS</span></h1>
        <p>No gym? No problem. No money? Even better. It's all free.</p>
        <button className="cta-btn" onClick={() => document.getElementById('workout')?.scrollIntoView({behavior: 'smooth'})}>
          Get My Free Plan →
        </button>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">🏋️</div>
          <h3>Workout Generator</h3>
          <p>Pick your goal, get a plan instantly. Bodyweight or with equipment.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🥗</div>
          <h3>Food Lookup</h3>
          <p>See calories, protein, carbs for common ingredients. You build the meal.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎓</div>
          <h3>100% Free</h3>
          <p>No credit card. No subscription. Just results for students.</p>
        </div>
      </div>
    </div>
  )
}