import { useState } from "react"
import styles from "./Dropdown.module.css"
import { motion } from 'framer-motion'
import { Menu } from '@headlessui/react'

const Dropdown = ({children, title}) => {
	const [toggle, setToggle] = useState(false)

	return (
		<Menu as="div" className={styles.container}>
			<Menu.Button className={styles.title} onClick={() => setToggle(!toggle)}>
				{title}
			</Menu.Button>
			<Menu.Items>
				<motion.div className={styles.dropdown}
					initial={{ y: 0 }}
					animate={{ y: 5 }}
				>
					{children.length > 1 ? children.map((element,index) => {
						{if(element.type == 'button' || element.type == 'label') {
							return (
								<Menu.Item>
									{({active}) => (
										<div key={index} className={`${styles.item} ${active && 'bg-slate-100'}`}>
											{element}
										</div>
									)}
								</Menu.Item> 
							)
						} else {
							return (
								<div key={index} className={`${styles.item}`}>
									{element}
								</div>
							)
						}
						}
					}) : children}
				</motion.div>
			</Menu.Items>
		</Menu>
	)
}

export default Dropdown