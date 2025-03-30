import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blackout from "./components/pages/blackout"
import Login from "./components/pages/login";
import Home from "./components/pages/home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Blackout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
