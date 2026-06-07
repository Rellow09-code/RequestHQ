import './Button.scss'
import { Link } from 'react-router-dom'

function SignUpButton(){
    return (
        <Link to={'/SignUp'} className="btn signUp">Sign Up</Link>
    )
}

function LogInButton(){
    return (
        <Link to={'/LogIn'} className="btn logIn">Log In</Link>
    )
}

export {SignUpButton, LogInButton}