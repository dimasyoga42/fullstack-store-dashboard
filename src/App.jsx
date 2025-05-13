import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboar'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Navbar from './components/navbar'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  

  if (isCheckingAuth && !authUser) return <div className='w-full h-screen flex justify-center justify-items-center items-center'><span class="loading loading-spinner loading-xs"></span></div>
  return (
    <>
    <Router>
      < Navbar />
      <Routes>
        <Route path = '/' element= {  < Home /> } />
        <Route path='/login' element={!authUser ? < Login /> : <Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={ authUser ? < Dashboard /> : <Navigate to={"/login"} />} />
      </Routes>  
    </Router>  
    </>
  )
}

export default App
