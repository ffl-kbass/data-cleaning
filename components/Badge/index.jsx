import styles from './Badge.module.css'

const Badge = ({children, type, size, shape}) => {
    return (
        <span className={`${styles.container} ${styles[type]} ${styles[size]} ${styles[shape]}`}>
            {children}
        </span>
    )
}

export default Badge