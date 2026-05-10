import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Workout from './pages/Workout'
import Ingredients from './pages/Ingredients'
import Survey from './pages/Survey'
import About from "./pages/About"

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
}

export default App