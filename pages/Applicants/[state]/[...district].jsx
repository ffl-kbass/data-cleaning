import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ApplicantView from '../../../components/Applicant'
import Title from '../../../components/Title'
import styles from './Applicant.module.css'
import Edit from '../../../components/Edit'

const Applicant = () =>
{
	const router = useRouter()
	const [scroll, setScroll] = useState(0)
	const [toggle, setToggle] = useState(true)
	const [selected, setSelected] = useState([])

	const handleCheckboxChange = (event) =>
	{
		if (event.target.checked)
		{
			if (!selected.includes(event.target.value))
			{
				setSelected(prev => [...prev, event.target.value])
			}
		} else
		{
			setSelected(selected.filter(element => element != event.target.value));
		}
	}

	return (
		<>
			<div className='w-full flex items-center justify-center'>
				{selected.length == 0 && <Edit>
					<button>Add</button>
				</Edit>}
				{selected.length == 1 && 
				<Edit>
					<button>Add</button>
					<button>Delete</button>
					<button>Edit</button>
					<button>Deallocate</button>
				</Edit>}
				{selected.length > 1 &&
				<Edit>
					<button>Add</button>
					<button>Delete</button>
					<button>Deallocate</button>
				</Edit>}
			</div>
			<div className='flex flex-col h-full w-full overflow-hidden'>
				<Title>
					Arvon Township School District
					{/* {router.query.district && router.query.district[0]} */}
				</Title>
				<div className={styles.container}>
					<ApplicantView primary={true} year={2022} scrollSync={toggle} scroll={setScroll} scrollPos={scroll} checked={handleCheckboxChange}/>
					<ApplicantView year={router.query.district && router.query.district[1] ? router.query.district[1] : new Date().getFullYear() - 1} scrollSync={toggle}  scroll={setScroll} scrollPos={scroll} />
				</div>
				<div className='w-full pt-2'>
					<button onClick={() => setToggle(!toggle)} className={`h-6 px-1.5 rounded-md font-semibold text-xs ${toggle ? `bg-blue-500 text-white` : `text-slate-600 bg-slate-200`}`}>{toggle ? 'Disable Scroll Sync' : 'Enable Scroll Sync'}</button>
				</div>
			</div>
		</>
	)
}

export default Applicant