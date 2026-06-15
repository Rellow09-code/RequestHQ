import LogInAuthentication from '../components/LogInAuthentication';
import styles from './SignUp.module.scss'

export default function LogIn(){
    return (
        <>
            <main id={styles.main_header}>
                <LogInAuthentication/>
            </main>
        </>
    )
}