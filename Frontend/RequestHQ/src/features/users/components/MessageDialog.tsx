import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "./MessageDialog.module.scss";

interface Props {
    show: boolean;
    onClose: () => void;
    onSend: (message: string) => void;
}

export default function MessageDialog({
    show,
    onClose,
    onSend
}: Props) {

    const [message, setMessage] = useState("");

    if (!show) {
        return null;
    }

    function handleSend() {
        if (!message.trim()) {
            return;
        }

        onSend(message);
        setMessage("");
        onClose();
    }

    return createPortal(
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <div
                className={styles.dialog}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                    autoFocus
                />

                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                >
                    <span className="material-icons">
                        send
                    </span>
                </button>
            </div>
        </div>,
        document.body
    );
}