import { useState, useEffect } from 'react'
import './Ingredients.css'

const foods = [
  { name: '🥚 Eggs', calories: 70, protein: '6g', carbs: '0.6g' },
  { name: '🍚 White Rice', calories: 130, protein: '2.7g', carbs: '28g' },
  { name: '🍛 Brown Rice', calories: 112, protein: '2.3g', carbs: '23g' },
  { name: '🥕 Carrots', calories: 41, protein: '0.9g', carbs: '10g' },
  { name: '🍗 Chicken Breast', calories: 165, protein: '31g', carbs: '0g' },
  { name: '🍌 Banana', calories: 105, protein: '1.3g', carbs: '27g' },
  { name: '🥛 Milk (low fat)', calories: 61, protein: '3.2g', carbs: '4.8g' },
  { name: '🍞 Whole Wheat Bread', calories: 265, protein: '9g', carbs: '49g' },
  { name: '🥑 Avocado', calories: 160, protein: '2g', carbs: '8.5g' },
  { name: '🍎 Apple', calories: 95, protein: '0.5g', carbs: '25g' },
  { name: '🥩 Beef (lean)', calories: 250, protein: '26g', carbs: '0g' },
  { name: '🐟 Salmon', calories: 208, protein: '20g', carbs: '0g' },
  { name: '🥔 Potato', calories: 77, protein: '2g', carbs: '17g' },
  { name: '🥜 Peanut Butter', calories: 188, protein: '8g', carbs: '6g' },
  { name: '🥬 Spinach', calories: 23, protein: '3g', carbs: '3.6g' },
  { name: '🍝 Pasta', calories: 131, protein: '5g', carbs: '25g' },
]

export default function Ingredients() {
  const [search, setSearch] = useState('')
  const [mealPlan, setMealPlan] = useState(null)
  const generateMealPlan = () => {
  const saved = localStorage.getItem("fitnessProfile")
  const data = saved ? JSON.parse(saved) : null

  const rawGoal = data?.goal

let goal = "active"

if (rawGoal === "Weight Loss") goal = "lose"
if (rawGoal === "Gain Muscle") goal = "build"
if (rawGoal === "Stay Active") goal = "active"

  const plan = {
    lose: [
      "🥚 Eggs + Veggies (low carbs)",
      "🍗 Grilled Chicken + Salad",
      "🐟 Fish + Steamed vegetables"
    ],
    build: [
      "🍗 Chicken + Rice (high protein)",
      "🥩 Beef + Sweet Potato",
      "🥤 Protein shake + Banana"
    ],
    active: [
      "🍚 Balanced rice + chicken",
      "🥗 Mixed vegetables + protein",
      "🍎 Fruits + light meal"
    ]
  }

  setMealPlan(plan[goal] || plan.active)
  
}
 useEffect(() => {
    generateMealPlan()
  }, [])

  const filtered = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div id="ingredients" className="ingredients-container">
      {/* HEADER */}
  <div className="nutrition-header">
    <h2>📊 Nutrition Dashboard</h2>
    <p>Based on your fitness profile</p>
  </div>

  
  {/* BODY */}
  <div className="content-grid">

    {/* LEFT */}
    <div className="meal-panel">
      <h2>🍽️ Sample Meal Plan: </h2>


      {mealPlan && (
        <ul>
          {mealPlan.map((meal, i) => (
            <li key={i}>{meal}</li>
          ))}
        </ul>
      )}
        <h2>Custom Your Meal Plan</h2>
        
    </div>

    {/* RIGHT */}
    <div className="ingredients-panel">
      <h2>🥦 Ingredients</h2>
      
      <input
        type="text"
        placeholder="Search foods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="food-grid">
        {filtered.map((food, i) => (
          <div key={i} className="food-card">
            <div className="food-name">{food.name}</div>
            <div className="food-calories">
              {food.calories} cal
            </div>
            <div className="food-macros">
              💪 {food.protein} 🍚 {food.carbs}
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>
  )
}