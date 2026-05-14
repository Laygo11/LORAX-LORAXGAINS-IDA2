import './Navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="app-navbar">

      <div className="logo">
        <a href="/">🌿 LORAX GAINS</a>
      </div>

      <div className="nav-actions">
        <Link to="/">
          <button className="back-btn">⬅ Back</button>
        </Link>
      </div>

    </div>
  )
}