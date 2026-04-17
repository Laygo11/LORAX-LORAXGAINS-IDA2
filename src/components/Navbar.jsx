import './Navbar.css'

export default function Navbar() {
  const scrollTo = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="navbar">
      <div className="logo">🌿 LORAX GAINS</div>
      <div className="nav-links">
        <button onClick={() => scrollTo('home')}>Home</button>
        <button onClick={() => scrollTo('workout')}>Workout</button>
        <button onClick={() => scrollTo('ingredients')}>Food</button>
      </div>
    </div>
  )
}