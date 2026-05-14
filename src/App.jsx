import { Routes, Route, useLocation } from "react-router-dom"

import Navbar from './components/Navbar'
import NavforSurv from './components/NavforSurv'

import Home from './pages/Home'
import Workout from './pages/Workout'
import Ingredients from './pages/Ingredients'
import Survey from './pages/Survey'
import About from "./pages/About"

function App() {
  const location = useLocation()

  const isSurvey = location.pathname === "/survey"

  return (
    <div>

      {isSurvey ? <NavforSurv /> : <Navbar />}

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