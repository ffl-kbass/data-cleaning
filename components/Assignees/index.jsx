import styles from "./Assignees.module.css"

const Assignees = ({names}) => {
	return (
		<div className={styles.container}>
			{names.map((name,index) => {
				return (
					<div key={index} className={styles.assignee} title={name.first + " " + name.last}>
						{name.first[0]}
						{name.last[0]}
					</div>
				)
			})}
		</div>
	)
}

export default Assignees