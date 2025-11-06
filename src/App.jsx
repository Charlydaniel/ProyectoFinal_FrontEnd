import { useState } from 'react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import  RegisterScreen  from './Screens/RegisterScreen/RegisterScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import { CreateWorkspace } from './services/workspaceServices'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import HomeMidelware from './MidelWarres/AuthMidelware/HomeMidleware'
import LoginMidelware from './MidelWarres/AuthMidelware/LoginMidleware'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import RegisterAwaitConfirm from './Components/Login-Components/RegisterAwaitConfirm'
import ErrorComponent from './Components/Error-components/ErrorComponent'
import VerifyEmailComponent from './Components/Verify-Email-components/VerifyEmail'
import { register } from './services/authService'
import WorkspaceCompoenent from './Components/Workspace-Components/Workspace-components/WorkspaceComponent'



function App() {

  const error_for_component={message:"Pagina inexistente"}

  const [count, setCount] = useState(0)

  return (
    /*Antes de ir a la Home pasa por el midleware <AuthMidleware/>*/
    <div>

        <Routes>

        <Route
          path='/api/workspaces/:workspace_id'
          element={<WorkspaceCompoenent />}
        />
        <Route
          path='/confirm/:email'
          element={<RegisterAwaitConfirm />}
        />
          <Route
          path='/api/auth/verify-email/:token'
          element={<VerifyEmailComponent />}
        />
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
        
        <Route
          element={<HomeMidelware />}>
          <Route
            path='/'
            element={<HomeScreen />}
          />
          
          
        </Route>
           <Route
              path='*'
              element={<ErrorComponent error={error_for_component}/>}
          />
      </Routes>
    </div>

  )
}

export default App
