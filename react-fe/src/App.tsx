
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
 
import SignIn from './components/SignIn'
import SignupComp from './components/Signup'

import LandingPage from './components/Landing'



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignupComp/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
