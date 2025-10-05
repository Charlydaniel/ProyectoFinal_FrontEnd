import { useState } from 'react'
import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import { CreateWorkspace } from './services/WorkspacesService'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/new_workspace' element={<NewWorkspaceScreen/>}/>
    </Routes>
     
  )
}

export default App
