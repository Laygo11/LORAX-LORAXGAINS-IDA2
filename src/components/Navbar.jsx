import './Navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="app-navbar">

      <div className="logo">
        <Link to="/">🌿 LORAX GAINS</Link>
      </div>

      <div className="nav-actions">

        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/workout">
          <button>Workout</button>
        </Link>

        <Link to="/ingredients">
          <button>Food</button>
        </Link>

        <Link to="/about">
          <button>About</button>
        </Link>

      </div>

    </div>
  )
}