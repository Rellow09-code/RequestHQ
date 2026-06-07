import './App.scss'
import { SignUpButton, LogInButton } from './features/auth/components/Buttons'

function App(){
  return(
    <>
      <section id='main_header'>
        <h1>Welcome to Request HQ</h1>
        <section className='auth_buttons'>
          <LogInButton/>
          <SignUpButton/>
        </section>
      </section>
    </>
  )
}

export default App
