import styles from './Edit.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useContext, useEffect } from 'react'
import { SelectedContext } from '../../Context/context';

const Edit = () => {
	const [edit, setEdit] = useState(false)
	const { selected } = useContext(SelectedContext);

	return (
		<>
		{edit && <motion.div 
			initial={{ opacity: 0, height: '1rem' }}
			animate={{ opacity: 1, height: 'auto' }}
			className='z-40 fixed overflow-hidden h-64 max-w-3xl min-w-[24rem] bottom-52 p-2 rounded-md bg-slate-800 border border-slate-700 text-white'
		>
			<div className='flex flex-col gap-4 w-full flex-wrap'>
				<label className={styles.input_container}>
					<p className={styles.title}>Purpose</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Download Speed (Mbps)</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Shared</p>
					<input type='checkbox' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Quantity</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Lines Allocated</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Monthly Elig Recurring</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Total Elig Non-Recurring</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Months of Service</p>
					<input type='text' />
				</label>
				<label className={styles.input_container}>
					<p className={styles.title}>Contract End Date</p>
					<input type='text' />
				</label>
			</div>
		</motion.div>}
		<div className='flex flex-col w-auto fixed z-40 bottom-36 gap-2'>
			{/* <p className='font-bold text-xs pl-2'>Services</p> */}
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
					<button onClick={() => setEdit(!edit)}>Edit</button>
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
		</>
	)
}

export default Edit