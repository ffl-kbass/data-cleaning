import styles from "./Home.module.css"

const Layout = ({children}) => {
	return (
		<section className={styles.layout}>
			{children}
		</section>
	)
}

export default Layout