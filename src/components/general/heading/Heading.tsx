import { ReactNode } from 'react'
import styles from './Heading.module.css';

function Heading({children}: {children: ReactNode}){
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Heading;