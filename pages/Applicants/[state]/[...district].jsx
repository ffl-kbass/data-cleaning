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
	const [selected, setSelected] = useState(null)
	const [selected_checkBoxes, setSelected_checkBoxes] = useState([])
	const [ent_num, setEntity_number] = useState(0)
	const [POS, setPOS] = useState(null)

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

	useEffect(() => {
		if(!selected) return

		setPOS(selected.target.getBoundingClientRect())

		if (selected.target.checked) {
			if (!selected_checkBoxes.includes(selected.target.value)) {
				setSelected_checkBoxes(prev => [...prev, selected.target.value])
			}
		} else {
			setSelected_checkBoxes(selected_checkBoxes.filter(element => element != selected.target.value));
		}
	},[selected])

	return (
		<>
			<div className='w-full flex items-center justify-center'>
				<Edit selected={selected_checkBoxes} pos={POS} scroll={scroll} />
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
								checked={setSelected}
							/>
							<ApplicantView 
								entity_number={router.query.district[0]} 
								year={router.query.district && router.query.district[1] ? router.query.district[1] : new Date().getFullYear() - 1} 
								scrollSync={toggle}  
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