import { useState, useEffect } from 'react'
import './Workout.css'

export default function Workout() {

  const [goal, setGoal] = useState('lose')
  const [days, setDays] = useState(3)
  const [equipment, setEquipment] = useState('none')
  const [level, setLevel] = useState('beginner')

  const [plan, setPlan] = useState([])
  const [activeDay, setActiveDay] = useState(0)
  const [unlockedDay, setUnlockedDay] = useState(0)

  const [profile, setProfile] = useState(null)
  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)

  // LOAD PROFILE
  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("fitnessProfile")
    )

    if (!data) return

    setProfile(data)

    if (data.goal === "Weight Loss") setGoal("lose")
    if (data.goal === "Gain Muscle") setGoal("build")
    if (data.goal === "Stay Active") setGoal("active")

    if (data.days === "1-2") setDays(2)
    if (data.days === "3-4") setDays(4)
    if (data.days === "5+") setDays(5)

    setLevel(data.level?.toLowerCase())

    setEquipment(
      data.location === "Gym"
        ? "gym"
        : "none"
    )

    const unlock =
      localStorage.getItem("unlockedDay")

    if (unlock) {
      setUnlockedDay(Number(unlock))
    }

  }, [])

  // 24 HOUR TIMER
  useEffect(() => {

    const interval = setInterval(() => {

      const saved =
        localStorage.getItem("cooldown")

      if (!saved) return

      const diff =
        Number(saved) - Date.now()

      setTimeLeft(diff > 0 ? diff : 0)

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  // GENERATE PLAN
  useEffect(() => {
    generatePlan()
  }, [goal, days, equipment, level])

  const pool = {

    upper: {
      none: ['Push-ups', 'Diamond Push-ups'],
      dumbbells: ['Shoulder Press', 'Rows'],
      gym: ['Bench Press', 'Cable Row']
    },

    lower: {
      none: ['Squats', 'Lunges'],
      dumbbells: ['Goblet Squat', 'RDL'],
      gym: ['Deadlift', 'Leg Press']
    },

    core: {
      none: ['Plank', 'Sit-ups'],
      dumbbells: ['Russian Twists'],
      gym: ['Cable Crunch']
    },

    cardio: {
      none: ['Burpees'],
      dumbbells: ['Thrusters'],
      gym: ['Treadmill']
    }

  }

  const reps =
    level === "advanced"
      ? "4 x 12"
      : level === "intermediate"
      ? "3 x 12"
      : "3 x 10"

  const random = (type, count) =>
    [...pool[type][equipment]]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)

  const getType = (ex) => {

    if (pool.upper[equipment].includes(ex))
      return "Upper"

    if (pool.lower[equipment].includes(ex))
      return "Lower"

    if (pool.core[equipment].includes(ex))
      return "Core"

    return "Cardio"
  }

  const generatePlan = () => {

    const newPlan = []

    for (let i = 0; i < days; i++) {

      let workout = [

        ...random("upper", 2),
        ...random("lower", 2),
        ...random("core", 1)

      ]

      if (goal === "lose") {
        workout.push(...random("cardio", 1))
      }

      workout = workout.map(ex => ({
        name: ex,
        reps,
        type: getType(ex)
      }))

      newPlan.push(workout)
    }

    setPlan(newPlan)
  }

  // DAY CLICK
  const handleDay = (i) => {

    if (i <= unlockedDay) {
      setActiveDay(i)
      return
    }

    setMessage(
      `Oopss you're still at Day ${unlockedDay + 1}, complete your exercise you naughty naughty 😭`
    )

    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  // COMPLETE DAY
  const completeDay = () => {

    if (timeLeft > 0) return

    const next = unlockedDay + 1

    if (next < days) {
      
      localStorage.removeItem("workoutStarted")
      setUnlockedDay(next)

      localStorage.setItem(
        "unlockedDay",
        next
      )

      // 24 HOURS
      localStorage.setItem(
        "cooldown",
        Date.now() + 86400000
      )

    }

    setMessage("Next day unlocked 💪")

    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  // FORMAT TIMER
  const formatTime = () => {

    const h =
      Math.floor(timeLeft / 3600000)

    const m =
      Math.floor((timeLeft % 3600000) / 60000)

    const s =
      Math.floor((timeLeft % 60000) / 1000)

    return `${h}h ${m}m ${s}s`
  }

  return (

    <div className="workout-container">

      {/* LEFT */}
      <div className="left-panel">

        <h3>CUSTOMIZE YOUR PLAN</h3>

        {timeLeft > 0 && (
          <div className="timer-box">
            ⏳ {formatTime()}
          </div>
        )}

        <label>Goal</label>

        <div className="pill-group">

          <button
            className={goal === 'lose' ? 'active' : ''}
            onClick={() => setGoal('lose')}
          >
            Lose
          </button>

          <button
            className={goal === 'build' ? 'active' : ''}
            onClick={() => setGoal('build')}
          >
            Build
          </button>

          <button
            className={goal === 'active' ? 'active' : ''}
            onClick={() => setGoal('active')}
          >
            Active
          </button>

        </div>

        <label>Days</label>

        <div className="pill-group">

          {[3,4,5].map(d => (

            <button
              key={d}
              className={days === d ? 'active' : ''}
              onClick={() => setDays(d)}
            >
              {d}
            </button>

          ))}

        </div>

        <label>Equipment</label>

        <div className="pill-group">

          <button
            className={equipment === 'none' ? 'active' : ''}
            onClick={() => setEquipment('none')}
          >
            None
          </button>

          <button
            className={equipment === 'dumbbells' ? 'active' : ''}
            onClick={() => setEquipment('dumbbells')}
          >
            Dumbbells
          </button>

          <button
            className={equipment === 'gym' ? 'active' : ''}
            onClick={() => setEquipment('gym')}
          >
            Gym
          </button>

        </div>

        <label>Level</label>

        <div className="pill-group">

          {['beginner','intermediate','advanced']
            .map(l => (

            <button
              key={l}
              className={level === l ? 'active' : ''}
              onClick={() => setLevel(l)}
            >
              {l}
            </button>

          ))}

        </div>

        <button
          className="generate-btn"
          onClick={generatePlan}
        >
          Generate my plan
        </button>

      </div>

      {/* RIGHT */}
      <div className="right-panel">

        <h2>{days}-Day Training Plan</h2>

        <div className="day-tabs">

          {plan.map((_, i) => (

            <button
              key={i}
              className={activeDay === i ? 'active' : ''}
              onClick={() => handleDay(i)}
            >
              Day {i + 1}
            </button>

          ))}

        </div>

        {message && (
          <div className="warning-box">
            {message}
          </div>
        )}

        <ul className="plan-list">

          {plan[activeDay]?.map((ex, i) => (

            <li key={i}>

              <span className="index">
                {i + 1}
              </span>

              <span className="exercise">
                {ex.name} ({ex.reps})
              </span>

              <span className={`tag ${ex.type.toLowerCase()}`}>
                {ex.type}
              </span>

            </li>

          ))}

        </ul>

    <button
  className="complete-btn"
  onClick={() => {

    // FIRST CLICK
    if (!localStorage.getItem("workoutStarted")) {

      localStorage.setItem(
        "workoutStarted",
        "true"
      )

      localStorage.setItem(
        "cooldown",
        Date.now() + 86400000
      )

      setMessage("Workout session started 💪")

      setTimeout(() => {
        setMessage("")
      }, 3000)

      return
    }

    // COMPLETE DAY
    completeDay()

  }}

  disabled={
    localStorage.getItem("workoutStarted") &&
    timeLeft > 0
  }
>

  {!localStorage.getItem("workoutStarted")
    ? "Start Workout"

    : timeLeft > 0
    ? `Wait ${formatTime()}`
    : "Complete Day"}

</button> 

<button
  className="reset-btn"
  onClick={() => {

    localStorage.removeItem("cooldown")
    localStorage.removeItem("workoutStarted")
    localStorage.removeItem("unlockedDay")

    setUnlockedDay(0)
    setActiveDay(0)
    setTimeLeft(0)

    setMessage("Workout progress reset.")

    setTimeout(() => {
      setMessage("")
    }, 3000)

  }}
>
  Reset Workout
</button>
        {/* PROFILE */}
        <div className="stats-box">

          <h3>Your Fitness Profile</h3>

          <p>
            <strong>Goal:</strong>
            {profile?.goal || " Not set"}
          </p>

          <p>
            <strong>Level:</strong>
            {profile?.level || " Not set"}
          </p>

          <p>
            <strong>Weight:</strong>
            {profile?.weight
              ? ` ${profile.weight} kg`
              : " Not set"}
          </p>

          <p>
            <strong>Height:</strong>
            {profile?.height
              ? ` ${profile.height} cm`
              : " Not set"}
          </p>

          <p>
            <strong>BMI:</strong>
            {profile?.bmi || " Not calculated"}
          </p>

        </div>

      </div>

    </div>
  )
}