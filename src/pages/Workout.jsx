import { useState, useEffect, useRef } from 'react'
import './Workout.css'

const EXERCISE_POOL = {
  upper: {
    none: ['Push-ups', 'Diamond Push-ups', 'Pike Push-ups', 'Wide Push-ups', 'Tricep Dips', 'Superman Hold'],
    dumbbells: ['Shoulder Press', 'Rows', 'Bicep Curls', 'Lateral Raises', 'Chest Fly', 'Tricep Kickbacks'],
    gym: ['Bench Press', 'Cable Row', 'Lat Pulldown', 'Chest Press Machine', 'Incline Press', 'Seated Row']
  },
  lower: {
    none: ['Squats', 'Lunges', 'Glute Bridges', 'Wall Sit', 'Jump Squats', 'Step-ups'],
    dumbbells: ['Goblet Squat', 'RDL', 'Sumo Squat', 'Bulgarian Split Squat', 'Dumbbell Lunge'],
    gym: ['Deadlift', 'Leg Press', 'Hack Squat', 'Leg Curl', 'Leg Extension', 'Smith Machine Squat']
  },
  core: {
    none: ['Plank', 'Sit-ups', 'Crunches', 'Leg Raises', 'Mountain Climbers', 'Bicycle Crunches'],
    dumbbells: ['Russian Twists', 'Weighted Crunch', 'Side Bends'],
    gym: ['Cable Crunch', 'Ab Machine', 'Cable Woodchop']
  },
  cardio: {
    none: ['Burpees', 'Jumping Jacks', 'High Knees', 'Box Jumps', 'Jump Rope'],
    dumbbells: ['Thrusters', 'Dumbbell Swings', 'Clean and Press'],
    gym: ['Treadmill', 'Rowing Machine', 'Stair Climber', 'Elliptical', 'Stationary Bike']
  }
}

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

  const [exerciseTimers, setExerciseTimers] = useState({})
  const [runningExercise, setRunningExercise] = useState(null)
  const [completedExercises, setCompletedExercises] = useState({})
  const EXERCISE_TIME = 300000

  // CUSTOMIZE MODE
  const [customizeMode, setCustomizeMode] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [searchTerm, setSearchTerm] = useState({})
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Exercise timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setExerciseTimers(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1000
            if (updated[key] <= 0) {
              updated[key] = 0
              setCompletedExercises(c => ({ ...c, [key]: true }))
              setRunningExercise(null)
              setMessage("Exercise complete 💪")
              setTimeout(() => setMessage(""), 2000)
            }
          }
        })
        return updated
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const startExercise = (dayIndex, exIndex) => {
    const key = `${dayIndex}-${exIndex}`
    if (runningExercise && runningExercise !== key) {
      setMessage("Finish current exercise first!")
      return
    }
    setRunningExercise(key)
    setExerciseTimers(prev => ({ ...prev, [key]: EXERCISE_TIME }))
  }

  const stopExercise = (dayIndex, exIndex) => {
    const key = `${dayIndex}-${exIndex}`
    setRunningExercise(null)
    setExerciseTimers(prev => ({ ...prev, [key]: 0 }))
    setMessage("Exercise stopped ⏹️")
    setTimeout(() => setMessage(""), 2000)
  }

  // Load profile
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fitnessProfile"))
    if (!data) return
    setProfile(data)
    if (data.goal === "Weight Loss") setGoal("lose")
    if (data.goal === "Gain Muscle") setGoal("build")
    if (data.goal === "Stay Active") setGoal("active")
    if (data.days === "1-2") setDays(2)
    if (data.days === "3-4") setDays(4)
    if (data.days === "5+") setDays(5)
    setLevel(data.level?.toLowerCase())
    setEquipment(data.location === "Gym" ? "gym" : "none")
    const unlock = localStorage.getItem("unlockedDay")
    if (unlock) setUnlockedDay(Number(unlock))
  }, [])

  // 24hr timer
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem("cooldown")
      if (!saved) return
      const diff = Number(saved) - Date.now()
      setTimeLeft(diff > 0 ? diff : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-generate plan on settings change
  useEffect(() => {
    generatePlan()
  }, [goal, days, equipment, level])

  const reps =
    level === "advanced" ? "4 x 12"
    : level === "intermediate" ? "3 x 12"
    : "3 x 10"

  const random = (type, count) =>
    [...EXERCISE_POOL[type][equipment]]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)

  const getType = (ex) => {
    const eq = equipment
    if (EXERCISE_POOL.upper[eq]?.includes(ex)) return "Upper"
    if (EXERCISE_POOL.lower[eq]?.includes(ex)) return "Lower"
    if (EXERCISE_POOL.core[eq]?.includes(ex)) return "Core"
    if (EXERCISE_POOL.cardio[eq]?.includes(ex)) return "Cardio"
    // fallback: search all equipment types
    for (const eqType of ['none', 'dumbbells', 'gym']) {
      if (EXERCISE_POOL.upper[eqType]?.includes(ex)) return "Upper"
      if (EXERCISE_POOL.lower[eqType]?.includes(ex)) return "Lower"
      if (EXERCISE_POOL.core[eqType]?.includes(ex)) return "Core"
      if (EXERCISE_POOL.cardio[eqType]?.includes(ex)) return "Cardio"
    }
    return "Core"
  }

  const generatePlan = () => {
    const newPlan = []
    for (let i = 0; i < days; i++) {
      let workout = [
        ...random("upper", 2),
        ...random("lower", 2),
        ...random("core", 1)
      ]
      if (goal === "lose") workout.push(...random("cardio", 1))
      newPlan.push(workout.map(ex => ({ name: ex, reps, type: getType(ex) })))
    }
    setPlan(newPlan)
    setCustomizeMode(false)
    setDropdownOpen(null)
  }

  // Get all recommended exercises for a given type, deduplicated
  const getRecommendations = (type, currentName, searchQuery) => {
    const allForType = [
      ...(EXERCISE_POOL[type?.toLowerCase()]?.[equipment] || []),
      ...(EXERCISE_POOL[type?.toLowerCase()]?.['none'] || []),
      ...(EXERCISE_POOL[type?.toLowerCase()]?.['dumbbells'] || []),
      ...(EXERCISE_POOL[type?.toLowerCase()]?.['gym'] || []),
    ]
    const unique = [...new Set(allForType)].filter(e => e !== currentName)
    if (searchQuery) return unique.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
    return unique
  }

  // Get all exercises across all categories (for free search)
  const getAllExercises = (searchQuery) => {
    const all = []
    for (const cat of Object.values(EXERCISE_POOL)) {
      for (const exList of Object.values(cat)) {
        all.push(...exList)
      }
    }
    const unique = [...new Set(all)]
    if (searchQuery) return unique.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
    return unique
  }

  // Update exercise name in plan
  const updateExerciseName = (dayIdx, exIdx, newName) => {
    setPlan(prev => {
      const updated = prev.map((day, di) =>
        di !== dayIdx ? day : day.map((ex, ei) =>
          ei !== exIdx ? ex : { ...ex, name: newName, type: getType(newName) }
        )
      )
      return updated
    })
    setDropdownOpen(null)
    setSearchTerm({})
  }

  // Update reps
  const updateExerciseReps = (dayIdx, exIdx, newReps) => {
    setPlan(prev =>
      prev.map((day, di) =>
        di !== dayIdx ? day : day.map((ex, ei) =>
          ei !== exIdx ? ex : { ...ex, reps: newReps }
        )
      )
    )
  }

  // Add new exercise to current day
  const addExercise = (dayIdx) => {
    setPlan(prev =>
      prev.map((day, di) =>
        di !== dayIdx ? day : [...day, { name: 'Push-ups', reps, type: 'Upper' }]
      )
    )
  }

  // Remove exercise
  const removeExercise = (dayIdx, exIdx) => {
    setPlan(prev =>
      prev.map((day, di) =>
        di !== dayIdx ? day : day.filter((_, ei) => ei !== exIdx)
      )
    )
  }

  const handleDay = (i) => {
    if (i <= unlockedDay) {
      setActiveDay(i)
      return
    }
    setMessage(`Oopss you're still at Day ${unlockedDay + 1}, complete your exercise you naughty naughty 😭`)
    setTimeout(() => setMessage(""), 3000)
  }

  const completeDay = () => {
    if (timeLeft > 0) return
    const next = unlockedDay + 1
    if (next < days) {
      localStorage.removeItem("workoutStarted")
      setUnlockedDay(next)
      localStorage.setItem("unlockedDay", next)
      localStorage.setItem("cooldown", Date.now() + 86400000)
    }
    setMessage("Next day unlocked 💪")
    setTimeout(() => setMessage(""), 3000)
  }

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600000)
    const m = Math.floor((timeLeft % 3600000) / 60000)
    const s = Math.floor((timeLeft % 60000) / 1000)
    return `${h}h ${m}m ${s}s`
  }

  const dropdownKey = (di, ei) => `${di}-${ei}`

  return (
    <div className="workout-container">

      {/* LEFT */}
      <div className="left-panel">
        <h3>CUSTOMIZE YOUR PLAN</h3>

        {timeLeft > 0 && (
          <div className="timer-box">⏳ {formatTime()}</div>
        )}

        <label>Goal</label>
        <div className="pill-group">
          {[['lose','Lose'],['build','Build'],['active','Active']].map(([val,label]) => (
            <button key={val} className={goal === val ? 'active' : ''} onClick={() => setGoal(val)}>{label}</button>
          ))}
        </div>

        <label>Days</label>
        <div className="pill-group">
          {[3,4,5].map(d => (
            <button key={d} className={days === d ? 'active' : ''} onClick={() => setDays(d)}>{d}</button>
          ))}
        </div>

        <label>Equipment</label>
        <div className="pill-group">
          {[['none','None'],['dumbbells','Dumbbells'],['gym','Gym']].map(([val,label]) => (
            <button key={val} className={equipment === val ? 'active' : ''} onClick={() => setEquipment(val)}>{label}</button>
          ))}
        </div>

        <label>Level</label>
        <div className="pill-group">
          {['beginner','intermediate','advanced'].map(l => (
            <button key={l} className={level === l ? 'active' : ''} onClick={() => setLevel(l)}>{l}</button>
          ))}
        </div>

        <button
          className={`generate-btn ${customizeMode ? 'customize-active' : ''}`}
          onClick={() => {
            if (!customizeMode) {
              setCustomizeMode(true)
            } else {
              setCustomizeMode(false)
              setDropdownOpen(null)
              setSearchTerm({})
            }
          }}
        >
          {customizeMode ? '✓ Done Customizing' : '✏️ Customize Your Plan'}
        </button>

        <button className="generate-btn" style={{marginTop: '8px'}} onClick={generatePlan}>
          🔄 Regenerate Plan
        </button>

        {customizeMode && (
          <div className="customize-hint">
            Click any exercise name to change it, or edit reps directly. Use the dropdown to pick from recommendations.
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="right-panel">
        <h2>{days}-Day Training Plan {customizeMode && <span className="customize-badge">Editing</span>}</h2>

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

        {message && <div className="warning-box">{message}</div>}

        <ul className="plan-list" ref={dropdownRef}>
          {plan[activeDay]?.map((ex, i) => {
            const key = dropdownKey(activeDay, i)
            const timerKey = `${activeDay}-${i}`
            const isDropOpen = dropdownOpen === key
            const query = searchTerm[key] || ''
            const recommendations = getAllExercises(query).filter(e => e !== ex.name)

            return (
              <li key={i} className={customizeMode ? 'editable' : ''}>
                <span className="index">{i + 1}</span>

                <div className="exercise-edit-group">
                  {customizeMode ? (
                    <div className="exercise-input-wrapper">
                      <input
                        className="exercise-input"
                        value={isDropOpen ? query : ex.name}
                        placeholder={ex.name}
                        onChange={(e) => {
                          setDropdownOpen(key)
                          setSearchTerm(prev => ({ ...prev, [key]: e.target.value }))
                        }}
                        onFocus={() => {
                          setDropdownOpen(key)
                          setSearchTerm(prev => ({ ...prev, [key]: '' }))
                        }}
                        readOnly={!isDropOpen && !customizeMode}
                      />
                      <button
                        className="dropdown-toggle"
                        onClick={() => {
                          setDropdownOpen(isDropOpen ? null : key)
                          setSearchTerm(prev => ({ ...prev, [key]: '' }))
                        }}
                        title="Browse exercises"
                      >
                        ▾
                      </button>

                      {isDropOpen && (
                        <div className="exercise-dropdown">
                          <div className="dropdown-section-label">
                            {ex.type} Exercises {query && `matching "${query}"`}
                          </div>
                          {recommendations.length === 0 && (
                            <div className="dropdown-empty">No exercises found</div>
                          )}
                          {recommendations.slice(0, 12).map((rec, ri) => (
                            <div
                              key={ri}
                              className="dropdown-item"
                              onClick={() => {
                                updateExerciseName(activeDay, i, rec)
                              }}
                            >
                              <span>{rec}</span>
                              <span className={`tag ${getType(rec).toLowerCase()} small`}>
                                {getType(rec)}
                              </span>
                            </div>
                          ))}
                          {query && !recommendations.find(r => r.toLowerCase() === query.toLowerCase()) && query.trim() && (
                            <div
                              className="dropdown-item dropdown-custom"
                              onClick={() => updateExerciseName(activeDay, i, query.trim())}
                            >
                              ＋ Use "{query.trim()}" (custom)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="exercise">{ex.name}</span>
                  )}

                  {customizeMode ? (
                    <input
                      className="reps-input"
                      value={ex.reps}
                      onChange={(e) => updateExerciseReps(activeDay, i, e.target.value)}
                      title="Edit sets × reps"
                    />
                  ) : (
                    <span className="exercise-reps">({ex.reps})</span>
                  )}
                </div>

                <span className={`tag ${ex.type.toLowerCase()}`}>{ex.type}</span>

                <span className="exercise-timer">
                  {exerciseTimers[timerKey] > 0
                    ? `${Math.floor(exerciseTimers[timerKey] / 60000)}:${String(Math.floor((exerciseTimers[timerKey] % 60000) / 1000)).padStart(2, "0")}`
                    : "5:00"}
                </span>

                <div className="exercise-btn-group">
                  <button
                    className="start-btn"
                    disabled={completedExercises[timerKey] || runningExercise === timerKey}
                    onClick={() => startExercise(activeDay, i)}
                  >
                    {completedExercises[timerKey] ? "Done" : "Start"}
                  </button>
                  {runningExercise === timerKey && (
                    <button
                      className="stop-btn"
                      onClick={() => stopExercise(activeDay, i)}
                      title="Stop timer"
                    >
                      ⏹
                    </button>
                  )}
                </div>

                {customizeMode && (
                  <button
                    className="remove-btn"
                    onClick={() => removeExercise(activeDay, i)}
                    title="Remove exercise"
                  >
                    ✕
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        {customizeMode && (
          <button className="add-exercise-btn" onClick={() => addExercise(activeDay)}>
            ＋ Add Exercise to Day {activeDay + 1}
          </button>
        )}

        <button
          className="complete-btn"
          onClick={() => {
            if (!localStorage.getItem("workoutStarted")) {
              localStorage.setItem("workoutStarted", "true")
              localStorage.setItem("cooldown", Date.now() + 86400000)
              setMessage("Workout session started 💪")
              setTimeout(() => setMessage(""), 3000)
              return
            }
            if (plan[activeDay] && !plan[activeDay].every((_, i) => completedExercises[`${activeDay}-${i}`])) {
              setMessage("Finish all exercises first 💪")
              setTimeout(() => setMessage(""), 3000)
              return
            }
            completeDay()
          }}
          disabled={localStorage.getItem("workoutStarted") && timeLeft > 0}
        >
          {!localStorage.getItem("workoutStarted") ? "Start Workout"
            : timeLeft > 0 ? `Wait ${formatTime()}`
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
            setTimeout(() => setMessage(""), 3000)
          }}
        >
          Reset Workout
        </button>

        <div className="stats-box">
          <h3>Your Fitness Profile</h3>
          <p><strong>Goal:</strong>{profile?.goal || " Not set"}</p>
          <p><strong>Level:</strong>{profile?.level || " Not set"}</p>
          <p><strong>Weight:</strong>{profile?.weight ? ` ${profile.weight} kg` : " Not set"}</p>
          <p><strong>Height:</strong>{profile?.height ? ` ${profile.height} cm` : " Not set"}</p>
          <p><strong>BMI:</strong>{profile?.bmi || " Not calculated"}</p>
        </div>

      </div>
    </div>
  )
}
