import styles from "./Timestamp.module.css"

const Timestamp = ({children}) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>Last Updated</p>
			<h2 className={styles.timestamp}>{children}</h2>
		</div>
	)
}

export default Timestamp