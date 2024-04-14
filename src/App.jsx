import react, {useEffect, useState} from "react"
import "./index.css"
import Register from "./components/Register"
import Login from "./components/Login"
import Nav from "./components/Nav"
import Social from "./components/Social"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Footer from "./components/Footer"
import SocialList from "./components/SocialList"
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [jwt, setJwt] = useState("");	
  	

  return (
    <>
      <Router>
        <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login setLogin={setIsLoggedIn} setJwt={setJwt} />} />
          <Route path="/register" element={<Register jwt={jwt} isLoggedIn={isLoggedIn}/>} />
          <Route path="/social" element={<Social isLoggedIn={isLoggedIn}/>} />
          <Route path="/social-list" element={<SocialList isLoggedIn={isLoggedIn} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
