import styles from './App.module.scss'
import { SignUpButton, LogInButton } from './features/auth/components/Buttons'
import startServer from './shared/services/startServer'

function App(){
  //Tries to awaken the server before the user request for anything
  startServer()
  return(
    <>
      <section className={styles.main_header}>
        <h1>Welcome to Request HQ</h1>
        <section className={styles.auth_buttons}>
          <LogInButton/>
          <SignUpButton/>
        </section>
      </section>
    </>
  )
}

export default App
