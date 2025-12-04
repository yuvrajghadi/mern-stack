import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/update/:id' element={<UpdateTask />} />
      </Routes>
    </>
  )
}

export default App
