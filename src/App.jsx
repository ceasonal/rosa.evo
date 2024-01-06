// import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Test from './pages/Test'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/test' element={<Test/>}/>
    </Routes>
    </>
  )
}

export default App
