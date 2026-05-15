import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem("loggedIn")

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

        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            style={{ marginLeft: "10px" }}
          >
            Login
          </button>
        )}

      </div>

    </div>
  )
}