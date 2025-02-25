import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      {/* Navigation bar component. */}
      <Navbar />

      {/* Outlet component to render child routes. */}
      <Outlet />

      {/* Footer component. */}
      <Footer />
    </>
  )
}

export default App