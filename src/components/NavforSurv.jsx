import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="app-navbar">

      <div className="navbar-accent" />

      <div className="logo">
        <Link to="/">🌿 LORAX GAINS</Link>
      </div>

      <div className="nav-actions">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

    </nav>
  )
}
