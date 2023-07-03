import styles from './alert.module.css';

export interface AlertProps {
    message: string,
    type: "success" | "error"
}
function Alert({message, type}: AlertProps): JSX.Element {
    return (
        <div className={styles.container} style={{backgroundColor: type === "success" ? "green" : "red"}}>
            {message}
        </div>
    )
}

export default Alert;