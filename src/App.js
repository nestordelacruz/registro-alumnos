import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import LogIn from "./components/LogIn"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/" element={ <LogIn/> } />
      </Routes>
    </div>
  )
}

export default App