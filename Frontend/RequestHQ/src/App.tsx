import styles from './App.module.scss'
import { SignUpButton, LogInButton } from './features/auth/components/Buttons'

function App(){
  return(
      <section className={styles.main_header}>
        <h1>Welcome to Request HQ</h1>
        <section className={styles.auth_buttons}>
          <LogInButton/>
          <SignUpButton/>
        </section>
      </section>
  )
}

export default App
