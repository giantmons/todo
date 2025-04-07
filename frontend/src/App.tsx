import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {


  return (
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
  )
}

export default App
