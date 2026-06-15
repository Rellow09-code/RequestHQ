import styles from './Button.module.scss'
import { Link } from 'react-router-dom'


function SignUpButton(){
    return (
        <Link to={'/SignUp'} className={`${styles.btn} ${styles.signUp}`}>Sign Up</Link>
    )
}

function LogInButton(){
    return (
        <Link to={'/LogIn'} className={`${styles.btn} ${styles.logIn}`}>Log In</Link>
    )
}

export {SignUpButton, LogInButton}