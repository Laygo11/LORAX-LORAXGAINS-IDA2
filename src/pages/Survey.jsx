import { useState } from "react";
import "./Survey.css";
import { useNavigate } from "react-router-dom";

function Survey() {
  const [formData, setFormData] = useState({
    goal: "",
    weight: "",
    height: "",
    level: "",
    location: "",
    days: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()

  if (!formData.goal || !formData.level || !formData.days) {
    alert("Please complete the survey")
    return
  }

const weight = Number(formData.weight)
const height = Number(formData.height)

const bmi =
  weight && height
    ? (weight / Math.pow(height / 100, 2)).toFixed(1)
    : null

  localStorage.setItem(
  "fitnessProfile",
  JSON.stringify({ ...formData, bmi })
)

  alert("Survey Submitted!")

  navigate("/workout")
}


  

  return (
    <div id="survey" className="survey-container">
      <div className="survey-panel">
        <h1>Personalized Fitness Survey</h1>

        <form onSubmit={handleSubmit}>

          <label>What is your fitness goal?</label>
          <select name="goal" onChange={handleChange}>
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Gain Muscle">Gain Muscle</option>
            <option value="Stay Active">Stay Active</option>
          </select>

          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            onChange={handleChange}
          />

          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            onChange={handleChange}
          />

          <label>Fitness Level</label>
          <select name="level" onChange={handleChange}>
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <label>Workout Location</label>
          <select name="location" onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="Home">Home</option>
            <option value="Gym">Gym</option>
          </select>

          <label>Workout Days Per Week</label>
          <select name="days" onChange={handleChange}>
            <option value="">Select</option>
            <option value="1-2">1-2</option>
            <option value="3-4">3-4</option>
            <option value="5+">5+</option>
          </select>

          <button className="survey-btn" type="submit">
            Generate My Plan
          </button>
            
        </form>
      </div>
    </div>
  );
}

export default Survey;