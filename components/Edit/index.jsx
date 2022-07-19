import styles from './Edit.module.css'
import { motion, AnimatePresence } from 'framer-motion'

const Edit = ({selected}) => {
	return (
		<div className='flex flex-row fixed z-40 bottom-24 gap-2'>
			{/* <p className='font-bold text-xs pl-2'>Services</p> */}
			{/* {<div className='h-64 w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-white'>
				test
			</div>} */}
			<nav className={styles.container}>
				{selected.length == 0 && 
				<motion.div 
					initial={{ y: "2rem" }}
					animate={{ y: "0rem" }}
				>
					<button>Add</button>
				</motion.div>}
				{selected.length == 1 && 
				<motion.div 
					initial={{ y: "2rem" }}
					animate={{ y: "0rem" }}
				>
					<button>Add</button>
					<button>Delete</button>
					<button>Edit</button>
					<button>Deallocate</button>
				</motion.div>}
				{selected.length > 1 &&
				<motion.div 
					initial={{ y: "2rem" }}
					animate={{ y: "0rem" }}
				>
					<button>Add</button>
					<button>Delete</button>
					<button>Deallocate</button>
				</motion.div>}
			</nav>
		</div>
	)
}

export default Edit