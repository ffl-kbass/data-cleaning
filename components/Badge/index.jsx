import styles from './Badge.module.css'

const Badge = ({children, type, size}) => {
    return (
        <span className={`${styles.container} ${styles[type]} ${styles[size]}`}>
            {children}
        </span>
    )
}

export default Badge