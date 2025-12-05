import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Protected from './components/Protected'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Protected><List /></Protected>} />
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/update/:id' element={<Protected><UpdateTask /></Protected>} />
      </Routes>
    </>
  )
}

export default App
