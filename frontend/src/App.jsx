import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
