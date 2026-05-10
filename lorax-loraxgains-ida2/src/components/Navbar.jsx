import './Navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        <a href="/">🌿 LORAX GAINS</a>
      </div>

      <div className="nav-links">

        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/workout">
          <button>Workout</button>
        </Link>

        <Link to="/ingredients">
          <button>Food</button>
        </Link>

        <Link to="/survey">
          <button>Survey</button>
        </Link>

      </div>

    </div>
  )
}