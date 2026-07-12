import type { MessageProps } from "../types/commonTypes";
import styles from "./MessageUI.module.scss";

export default function MessageUI({body, time, mine}: MessageProps) {
    return (
        <section
            className={`${styles.message} ${
                mine ? styles.sent : styles.received
            }`}
        >
            <section className={styles.bubble}>
                <p>{body}</p>
                <span>{time}</span>
            </section>
        </section>
    );
}