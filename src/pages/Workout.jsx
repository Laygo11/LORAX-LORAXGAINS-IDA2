import { useState } from 'react'
import './Workout.css'

export default function Workout() {
  const [goal, setGoal] = useState('lose')
  const [plan, setPlan] = useState(null)

  const workouts = {
    lose: ['Jumping Jacks - 30 sec', 'Push-ups - 10 reps', 'Squats - 15 reps', 'Mountain Climbers - 20 reps', 'Plank - 20 sec'],
    build: ['Push-ups - 15 reps', 'Dips - 12 reps', 'Lunges - 12 reps each leg', 'Pull-ups - 5 reps', 'Plank - 45 sec'],
    active: ['Walking - 20 min', 'Stretching - 10 min', 'Light squats - 10 reps', 'Arm circles - 20 reps']
  }

  const generatePlan = () => {
    setPlan(workouts[goal])
  }

  return (
    <div id="workout" className="workout-section">
      <h2>📋 Your Workout Plan</h2>
      
      <div className="workout-controls">
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="lose">🔥 Lose Weight</option>
          <option value="build">💪 Build Muscle</option>
          <option value="active">🧘 Stay Active</option>
        </select>
        
        <button onClick={generatePlan}>Generate Plan</button>
      </div>

      {plan && (
        <div className="plan-output">
          <h3>Your {goal === 'lose' ? 'Weight Loss' : goal === 'build' ? 'Muscle Building' : 'Active Lifestyle'} Plan:</h3>
          <ul>
            {plan.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}