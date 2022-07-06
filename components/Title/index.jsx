import styles from "./Title.module.css"

const Title = ({children}) =>
{
	return (
		<div className={styles.container}>
			<p className={styles.sub}>Connect K-12 Data Cleaning</p>
			<h2 className={styles.title}>{children}</h2>
		</div>
	)
}

export default Title