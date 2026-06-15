import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import SignUp from './features/auth/pages/SignUp.tsx'
import Home from './features/users/pages/Home.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './features/auth/pages/LogIn.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
