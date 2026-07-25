import type { LoadingProps } from '../types/commonTypes';
import styles from './Loading.module.scss';


export default function Loading({ show, message = "Loading..." }: LoadingProps) {
    if (!show) return null;
    return (
        <div className={styles.overlay}>
            <div className={styles.loaderCard}>
                <div className={styles.spinner}></div>
                <p>{message}</p>
            </div>
        </div>
    );
}