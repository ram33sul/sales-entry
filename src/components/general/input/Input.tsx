import { CSSProperties, FormEvent } from 'react'
import styles from './Input.module.css'

interface Props{
    value: string | number | undefined,
    onChange?: (e: FormEvent<HTMLInputElement>) => void,
    label: string,
    style?: CSSProperties,
    readOnly?: boolean,
    containerStyle?: CSSProperties,
    required?: boolean,
    type?: string,
    error?: string
}

function Input({value, onChange, label, style, readOnly, containerStyle, required, type, error}: Props){

    return (
        <div className={styles.container} style={containerStyle}>
            <input className={styles.input} value={value} onChange={onChange} style={style} readOnly={readOnly} required={required} type={type ?? 'text'} />
            <label className={`${styles.label} ${readOnly && styles["label-readonly"]}`} style={{color: error ? 'red' : ''}}>{error ? error : label}</label>
        </div>
    )
}

export default Input;