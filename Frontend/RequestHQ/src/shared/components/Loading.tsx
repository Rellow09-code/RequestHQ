import styles from './Loading.module.scss';

type LoadingProps = {
    show: boolean;
    message?: string;
};

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