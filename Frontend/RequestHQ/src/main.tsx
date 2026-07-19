import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import SignUp from './features/auth/pages/SignUp.tsx'
import Home from './features/users/pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './features/auth/pages/LogIn.tsx'
import startServer from './shared/services/startServer.tsx'
import UpdateInfo from './features/users/pages/UpdateInfo.tsx'

//Tries to awaken the server before the user request for anything
startServer()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/UpdateInfo' element={<UpdateInfo/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
