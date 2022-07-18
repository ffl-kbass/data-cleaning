import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'urql';
import ApplicantView from '../../../components/Applicant'
import Title from '../../../components/Title'
import styles from './Applicant.module.css'
import Edit from '../../../components/Edit'
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';

const Applicant = () =>
{
	const router = useRouter()
	const [scroll, setScroll] = useState(0)
	const [toggle, setToggle] = useState(false)
	const [selected, setSelected] = useState([])
	const [ent_num, setEntity_number] = useState(0)

	useEffect(() => {
		if(router.query.district) {
			setEntity_number(router.query.district)
		}
	},[router])

	const [result] = useQuery({
		query: `
			query(
				$funding_year: Int,
				$entity_number: Int!,
			) {
			district (
					funding_year: $funding_year,
					entity_number: $entity_number,
				) {
					items {
						entity_name
					}
				}
			}
		`,
		variables: {
			funding_year: 2022,
			entity_number: Number(ent_num)
		}
	})

	const { data , fetching, error } = result;

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
					{data ? data.district.items.entity_name : "Finding Client..."}
				</Title>
				<div className={styles.container}>
					{
						router.query.district && 
						<>
							<ApplicantView 
								entity_number={router.query.district[0]} 
								primary={true} 
								year={2022} 
								scrollSync={toggle} 
								scroll={setScroll} 
								scrollPos={scroll} 
								checked={handleCheckboxChange}
							/>
							<ApplicantView 
								entity_number={router.query.district[0]} 
								year={router.query.district && router.query.district[1] ? router.query.district[1] : new Date().getFullYear() - 1} 
								scrollSync={toggle}  
								scroll={setScroll} 
								scrollPos={scroll} 
							/>
						</>
					}
				</div>
				<div className='w-full pt-2'>
					<Button onClick={() => setToggle(!toggle)}>{toggle ? 'Disable Scroll Sync' : 'Enable Scroll Sync'}</Button>
				</div>
			</div>
		</>
	)
}

export default Applicant