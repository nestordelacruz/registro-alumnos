import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Authentication from "./Authentication"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="authentication" element={ <Authentication/> } />
      </Routes>
    </div>
  )
}

export default App