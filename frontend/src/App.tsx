import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import Splashscreen from "./pages/splashscreen";

function App() {


  return (
        <Router>
          <Routes>
            <Route path="/" element={<Splashscreen/>}> </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
  )
}

export default App
