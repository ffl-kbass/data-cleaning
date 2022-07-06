import styles from './Edit.module.css'
import { motion, AnimatePresence } from 'framer-motion'

const Edit = ({children}) => {
	return (
		<motion.div 
			className='flex flex-col fixed z-40 bottom-0'
			initial={{ bottom: "-6rem" }}
			animate={{ bottom: "6rem" }}
		>
			{/* <p className='font-bold text-xs pl-2'>Services</p> */}
			<nav className={styles.container}>
				{children}
			</nav>
		</motion.div>
	)
}

export default Edit