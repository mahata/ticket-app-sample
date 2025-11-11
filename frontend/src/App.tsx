import { useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <nav>
        <Link to="/my-path">Go to My Path</Link>
      </nav>
    </>
  )
}

export default App
