import { CSSProperties, ReactNode } from 'react'
import styles from './Button.module.css';

function Button({children, onClick, style, loading}: {children: ReactNode, onClick: () => void, style?: CSSProperties, loading?: boolean}) {
    return (
        <button className={styles.button} onClick={onClick} style={style}>
            {loading ? 'Loading' : children}
        </button>
    )
}

export default Button;