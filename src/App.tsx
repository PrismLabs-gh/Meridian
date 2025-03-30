import { useState } from 'react'
import './App.css'
import { Greeting } from './components/Greeting/Greeting'
import { Routes, Route } from 'react-router-dom'


function HomepageWrapper() {
  return (
    <div className="homepage">
      <div className="page-content">
        <Greeting username='user'/>
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<HomepageWrapper />} />
    </Routes>
  )
}

export default App
