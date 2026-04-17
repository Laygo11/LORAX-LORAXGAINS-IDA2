import { useState } from 'react'
import './Ingredients.css'

const foods = [
  { name: '🥚 Eggs', calories: 70, protein: '6g', carbs: '0.6g' },
  { name: '🍚 Rice', calories: 130, protein: '2.7g', carbs: '28g' },
  { name: '🥕 Carrots', calories: 41, protein: '0.9g', carbs: '10g' },
  { name: '🍗 Chicken', calories: 165, protein: '31g', carbs: '0g' },
  { name: '🍌 Banana', calories: 105, protein: '1.3g', carbs: '27g' },
  { name: '🥛 Milk', calories: 61, protein: '3.2g', carbs: '4.8g' },
  { name: '🍞 Bread', calories: 265, protein: '9g', carbs: '49g' },
  { name: '🥑 Avocado', calories: 160, protein: '2g', carbs: '8.5g' },
]

export default function Ingredients() {
  const [search, setSearch] = useState('')
  
  const filtered = foods.filter(food => 
    food.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div id="ingredients" className="ingredients-section">
      <h2>🥦 Ingredient Calories</h2>
      <p className="subtitle">Look up calories & macros for common ingredients</p>
      
      <input 
        type="text" 
        placeholder="🔍 Search... (eggs, rice, chicken)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="food-grid">
        {filtered.map((food, index) => (
          <div key={index} className="food-card">
            <div className="food-name">{food.name}</div>
            <div className="food-calories">{food.calories} <span>calories</span></div>
            <div className="food-macros">
              <span>💪 {food.protein}</span>
              <span>🍚 {food.carbs}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}