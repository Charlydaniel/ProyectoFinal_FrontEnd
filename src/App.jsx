import { useState } from 'react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import { CreateWorkspace } from './services/workspaceServices'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import HomeMidelware from './MidelWarres/AuthMidelware/HomeMidleware'
import LoginMidelware from './MidelWarres/AuthMidelware/LoginMidleware'
import HomeScreen from './Screens/HomeScreen/HomeScreen'




function App() {

  const [count, setCount] = useState(0)

  return (
    /*Antes de ir a la Home pasa por el midleware <AuthMidleware/>*/
    <div>
        <Routes>

        <Route
          path='/register'
          element={<RegisterScreen />}
        />
        <Route
          element={<LoginMidelware />}>
          <Route
            path='/login'
            element={<LoginScreen />}
          />
        </Route>

        <Route
          path='/new_workspace'
          element={<NewWorkspaceScreen />}
        />

        <Route
          element={<HomeMidelware />}>
          <Route
            path='/home'
            element={<HomeScreen />}
          />
        </Route>

      </Routes>
    </div>

  )
}

export default App
