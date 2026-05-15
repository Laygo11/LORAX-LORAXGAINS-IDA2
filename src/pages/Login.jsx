import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    setError("")
    localStorage.setItem("loggedIn", "true")
    navigate("/")
  }

  return (
    <div className="login-container">

      <div className="login-hero-accent" />

      <div className="login-panel">

        <p className="login-eyebrow">Welcome Back</p>

        <h1 className="login-title">
          LET'S GET<br />
          <span className="login-title-accent">BACK AT IT</span>
        </h1>

        <p className="login-subtitle">
          Login to continue your fitness journey 💪
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit-btn">
            Login →
          </button>

        </form>

      </div>

    </div>
  )
}
