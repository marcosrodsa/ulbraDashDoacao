import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import CadastroPage from './pages/Cadastro'
import DashboardPage from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
