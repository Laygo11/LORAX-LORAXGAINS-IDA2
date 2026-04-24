import { useState } from 'react'
import './Workout.css'

export default function Workout() {
  const [goal, setGoal] = useState('lose')
  const [days, setDays] = useState(3)
  const [equipment, setEquipment] = useState('none')
  const [level, setLevel] = useState('beginner')
  const [plan, setPlan] = useState([])
  const [activeDay, setActiveDay] = useState(0)

  // Categorized exercises
  const exercisePool = {
    upper: {
      none: ['Push-ups', 'Pike Push-ups', 'Diamond Push-ups'],
      dumbbells: ['Dumbbell Press', 'Shoulder Press', 'Bicep Curls', 'Rows'],
      gym: ['Bench Press', 'Lat Pulldown', 'Cable Row', 'Chest Fly']
    },
    lower: {
      none: ['Squats', 'Lunges', 'Glute Bridge', 'Wall Sit'],
      dumbbells: ['Goblet Squat', 'Dumbbell Lunges', 'Romanian Deadlift'],
      gym: ['Leg Press', 'Deadlift', 'Leg Curl', 'Calf Raises']
    },
    core: {
      none: ['Plank', 'Sit-ups', 'Leg Raises', 'Mountain Climbers'],
      dumbbells: ['Weighted Sit-ups', 'Russian Twists'],
      gym: ['Cable Crunch', 'Ab Machine']
    },
    cardio: {
      none: ['Jumping Jacks', 'High Knees', 'Burpees'],
      dumbbells: ['Dumbbell Thrusters'],
      gym: ['Treadmill', 'Cycling', 'Row Machine']
    }
  }

  const getReps = () => {
    if (level === 'beginner') return '3 x 10'
    if (level === 'intermediate') return '3 x 15'
    return '4 x 12'
  }

  const generatePlan = () => {
    const newPlan = []

    for (let d = 0; d < days; d++) {
      let day = []

      const pick = (category, count) => {
        const list = exercisePool[category][equipment]
        return list.sort(() => 0.5 - Math.random()).slice(0, count)
      }

      // Balanced workout per day
      day = [
        ...pick('upper', 2),
        ...pick('lower', 2),
        ...pick('core', 1)
      ]

      // Add cardio if goal is lose weight
      if (goal === 'lose') {
        day.push(...pick('cardio', 1))
      }

      // Build muscle = more strength
      if (goal === 'build') {
        day.push(...pick('upper', 1))
      }

      // Format
      day = day.map(ex => ({
        name: ex,
        reps: getReps(),
        type:
          exercisePool.upper[equipment].includes(ex) ? 'Upper' :
          exercisePool.lower[equipment].includes(ex) ? 'Lower' :
          exercisePool.core[equipment].includes(ex) ? 'Core' :
          'Cardio'
      }))

      newPlan.push(day)
    }

    setPlan(newPlan)
    setActiveDay(0)
  }

  return (
    <div className="workout-container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <h3>CUSTOMIZE YOUR PLAN</h3>

        <label>Goal</label>
        <div className="pill-group">
          <button className={goal === 'lose' ? 'active' : ''} onClick={() => setGoal('lose')}>Lose weight</button>
          <button className={goal === 'build' ? 'active' : ''} onClick={() => setGoal('build')}>Build muscle</button>
          <button className={goal === 'active' ? 'active' : ''} onClick={() => setGoal('active')}>Stay active</button>
        </div>

        <label>Days per week</label>
        <div className="pill-group">
          {[3,4,5].map(d => (
            <button key={d} className={days === d ? 'active' : ''} onClick={() => setDays(d)}>
              {d}
            </button>
          ))}
        </div>

        <label>Equipment</label>
        <div className="pill-group">
          <button className={equipment === 'none' ? 'active' : ''} onClick={() => setEquipment('none')}>No equipment</button>
          <button className={equipment === 'dumbbells' ? 'active' : ''} onClick={() => setEquipment('dumbbells')}>Dumbbells</button>
          <button className={equipment === 'gym' ? 'active' : ''} onClick={() => setEquipment('gym')}>Full gym</button>
        </div>

        <label>Level</label>
        <div className="pill-group">
          <button className={level === 'beginner' ? 'active' : ''} onClick={() => setLevel('beginner')}>Beginner</button>
          <button className={level === 'intermediate' ? 'active' : ''} onClick={() => setLevel('intermediate')}>Intermediate</button>
          <button className={level === 'advanced' ? 'active' : ''} onClick={() => setLevel('advanced')}>Advanced</button>
        </div>

        <button className="generate-btn" onClick={generatePlan}>
          Generate my plan
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>{days}-Day Training Plan</h2>

        {plan.length > 0 && (
          <div className="day-tabs">
            {plan.map((_, i) => (
              <button
                key={i}
                className={activeDay === i ? 'active' : ''}
                onClick={() => setActiveDay(i)}
              >
                Day {i + 1}
              </button>
            ))}
          </div>
        )}

        {plan.length > 0 ? (
          <ul className="plan-list">
            {plan[activeDay].map((ex, index) => (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <span className="exercise">{ex.name} ({ex.reps})</span>
                <span className={`tag ${ex.type.toLowerCase()}`}>
                  {ex.type}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder">Generate your workout plan.</p>
        )}
      </div>
    </div>
  )
}