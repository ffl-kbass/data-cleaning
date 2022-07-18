import { useRouter } from 'next/router'
import { useQuery } from 'urql';
import { useEffect, useRef, useState } from 'react'
import Card from '../Card'
import Indicator from '../Card/Indicator'
import Table from '../Table'
import card from '../Card/Card.module.css'
import Dropdown from '../Dropdown'
import styles from "./Applicant.module.css"
import Spinner from '../Spinner';

const DISTRICT_QUERY = `
query(
	$funding_year: Int,
	$entity_number: Int!,
) {
  district (
		funding_year: $funding_year,
		entity_number: $entity_number,
	) {
		items {
			funding_year
			state_code
			entity_name
			entity_number
			num_students
			child_entity_numbers
			total_bandwidth_mbps
			bandwidth_per_student_mbps
			adj_bandwidth_per_student_mbps
			cost_per_mbps
			in_universe
		}
	}
}
`;

const SERVICE_QUERY = `
query(
	$funding_year: Int,
	$entity_number: Int!,
) {
  services (
		funding_year: $funding_year,
		entity_number: $entity_number,
	) {
		items {
			received {
				frn {
					frn
					line_item
					purpose
					download_speed_mbps
					shared
					num_lines
					district_num_lines
					monthly_recurring_eligible_costs
					total_non_recurring_eligible_costs
					months_of_service
					contract_expiration_date
					fcstatus
					service_id
					applicant_ben
					narrative
					service_provider_name
				}
			}
			not_received {
				frn {
					frn
					line_item
					purpose
					download_speed_mbps
					shared
					num_lines
					district_num_lines
					monthly_recurring_eligible_costs
					total_non_recurring_eligible_costs
					months_of_service
					contract_expiration_date
					fcstatus
					service_id
					applicant_ben
					narrative
					service_provider_name
				}
			}
		}
	}
}
`;

const ApplicantView = ({ entity_number, year, scroll, scrollPos, scrollSync, checked = null, primary = false }) =>
{
	const app = useRef(null)
	const [currentYear,setYear] = useState(year)
	const [editClosed, setEditClosed] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [service, setService] = useState([])
	const [head, setHead] = useState([null, 'Line Item', 'Purpose', 'Download Speed (Mbps)', 'Shared', 'Quantity', 'Lines Allocated', 'Monthly Elig Recurring', 'Total Elig Non-Recurring', 'Months of Service', 'Contract End Date'])

	const [result] = useQuery({
		query: DISTRICT_QUERY,
		variables: {
			funding_year: currentYear,
			entity_number: Number(entity_number)
		}
	})

	const { data , fetching, error } = result;

	const [service_result] = useQuery({
		query: SERVICE_QUERY,
		variables: {
			funding_year: currentYear,
			entity_number: Number(entity_number)
		}
	})

	const { data: service_data , fetching: service_fetching, error: service_error } = service_result;
	
	useEffect(() => {
		if(service_fetching == true) return
		let temp = {
			received: [],
			not_received: []
		}
		let parent_temp = []
		const types = ['received', 'not_received']

		const { items } = service_data.services

		try {
			types.forEach((type) => {
				if(!items[type]) return
				items[type].forEach((rec, index) => {
					let information = {
						frn: '',
						applicant: '',
						service_provider: '',
						narrative: '',
						status: '',
	
					}
					rec.frn.forEach((sub_item, index) => {
						information.frn = sub_item.frn
						information.applicant = sub_item.applicant_ben
						information.service_provider = sub_item.service_provider_name
						information.narrative = sub_item.narrative
						information.status = sub_item.status

						temp[type].push({
							data: [ 
								{
									type: 'input',
									props: {
										value: sub_item.service_id,
										type: "checkbox",
										onChange: (e) => checked(e)
									}
								},
								sub_item.line_item,
								sub_item.purpose,
								sub_item.download_speed_mbps, 
								{
									type: Indicator,
									props: {
										cleared: sub_item.shared
									}
								}, 
								sub_item.num_lines, 
								sub_item.district_num_lines, 
								`$${sub_item.monthly_recurring_eligible_costs}`, 
								`$${sub_item.total_non_recurring_eligible_costs}`, 
								sub_item.months_of_service, 
								sub_item.contract_expiration_date, 
							]
						})
						if(!primary) {
							temp[type][index].data.shift()
						}
					})
					parent_temp.push({info: information, data:temp});
					temp = {
						received: [],
						not_received: []
					}
				})
			})

			setService(parent_temp)
		} catch (err) {
			console.log(err)
			setService([])
		}
	},[service_data])

	useEffect(() => {		
		if(!primary) {
			setHead(['Line Item', 'Purpose', 'Download Speed (Mbps)', 'Shared', 'Quantity', 'Lines Allocated', 'Monthly Elig Recurring', 'Total Elig Non-Recurring', 'Months of Service', 'Contract End Date'])
		}
	},[])


	useEffect(() =>
	{
		if (scrollSync)
			app.current.scrollTop = scrollPos
	}, [scrollPos])

	useEffect(() =>
	{
		app.current.addEventListener('scroll', (element) =>
		{
			scroll(element.target.scrollTop)
		})

		return (
			app.current.removeEventListener('scroll', (element) =>
			{
				scroll(element.target.scrollTop)
			})
		)
	}, [])

	const getYears = () => {
		const start = 2019
		const end = new Date().getFullYear()

		let years = []

		for(let i = start; i < end; i++) {
			years.push(i)
		}

		return years.reverse()
	}

	return (
		<div ref={app} className={`w-full h-full flex-1 overflow-x-hidden overflow-y-auto p-4 rounded-md dark:text-slate-50 ${primary && 'bg-blue-600/10 border border-blue-500'}`}>
			<div className='inline-flex flex-row items-center gap-1 mb-6'>
				{!primary ?
				<Dropdown title={
					<>
						<h4 className='text-xl font-bold text-left inline-flex flex-row gap-2 items-center justify-center'>
							{currentYear}
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</h4>
					</>
				}>
					{getYears().map((year, index) => {
						return <button onClick={() => setYear(year)} className='p-2 rounded-md' key={index}>{year}</button>
					})}
				</Dropdown>
				: <h4 className='text-3xl font-bold text-blue-600'>{year}</h4>
				}
			</div>
			<div className='flex flex-col gap-8'>
				<div className='flex flex-row flex-wrap gap-4'>
					<Card className="flex-1 max-w-md min-w-[16rem]">
					{!fetching ?
						<>
							<h2 className={card.title}>District Metrics</h2>
							<ul className={styles.card_content}>
								<li className={styles.item}>
									<p className={styles.label}>District Name</p>
									<p className={styles.content} title={data.district.items.entity_name}>{data.district.items.entity_name}</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Entity Number</p>
									<p className={styles.content}>{data.district.items.entity_number}</p>
								</li>
								{/* <li className={styles.item}>
									<p className={styles.label}>Other District BENs</p>
									<p className={styles.content}>test</p>
								</li> */}
								<li className={styles.item}>
									<p className={styles.label}>State Code</p>
									<p className={styles.content}>{data.district.items.state_code}</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Child Entities/Schools</p>
									<p className={styles.content} title={data.district.items.child_entity_numbers}>
										{data.district.items.child_entity_numbers && JSON.parse(`[${data.district.items.child_entity_numbers}]`).length}
									</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Num Students</p>
									<p className={styles.content}>{data.district.items.num_students}</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Total BW</p>
									<p className={styles.content}>{data.district.items.total_bandwidth_mbps} Mbps</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>BW/Student</p>
									<p className={styles.content}>{data.district.items.bandwidth_per_student_mbps} Mbps</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Adjusted BW/Student</p>
									<p className={styles.content}>{data.district.items.adj_bandwidth_per_student_mbps} Mbps</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Cost/Mbps</p>
									<p className={styles.content}>${Number(data.district.items.cost_per_mbps).toFixed(2)}</p>
								</li>
								<li className={styles.item}>
									<p className={styles.label}>Included in Connect K-12</p>
									<p className={styles.content}>{data.district.items.in_universe == 1 ? 'True' : 'False'}</p>
								</li>
							</ul>
						</>
						: 
						<div className='w-full h-full flex items-center justify-center'>
							<Spinner />
						</div>}
					</Card>
					<Card className="flex-1 flex flex-col gap-2 max-w-md min-w-[16rem]">
						<h2 className={card.title}>Data Quality Indicators</h2>
						<ul className='text-sm'>
							<li className={styles.title}>
								<p className='font-bold'>Open Issues Found:</p>
								<button onClick={() => setEditOpen(!editOpen)} className={styles.edit}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
									</svg>
								</button>
							</li>
							<li><Indicator cleared={false} edit={editOpen}>Outlier: Bandwidth/Student</Indicator></li>
						</ul>
						<ul className='text-sm'>
							<li className={styles.title}>
								<p className='font-bold'>Resolved Issues:</p>
								<button onClick={() => setEditClosed(!editClosed)} className={styles.edit}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
									</svg>
								</button>
							</li>
							<li><Indicator cleared={true} edit={editClosed}>Missing Internet Transport</Indicator></li>
						</ul>
					</Card>
				</div>
				{!service_fetching ? 
				<>
					<div className='w-full px-4'>
						<h3 className='text-xl font-bold'>Services Received</h3>
					</div>
					{service.map((item, index) => {
						if(item.data.received.length == 0) return
						return (
							<Card key={index} className="min-w-[16rem]">
								<ul className={styles.card_content}>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>FRN</p>
										<p className={styles.content}>{item.info.frn}</p>
									</li>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>Applicant</p>
										<p className={styles.content}>{item.info.applicant}</p>
									</li>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>Service Provider</p>
										<p className={styles.content}>{item.info.service_provider}</p>
									</li>
									<li className='p-2 rounded-md bg-slate-100 dark:text-white dark:bg-slate-900'>{item.info.narrative}</li>
								</ul>
								<Table key={index} head={head} body={item.data.received} search={false} filter={false} sort={false} assignees={false} timestamp={false} />
							</Card>
						)
					})}
				</>
				: 
				<div className='w-full h-64'>
					<Spinner />
				</div>
				}
				{!service_fetching ? 
				<>
					<div className='w-full px-4'>
						<h3 className='text-xl font-bold'>Services Not Received</h3>
					</div>
					{service.map((item, index) => {
						if(item.data.not_received.length == 0) return
						return (
							<Card key={index} className="min-w-[16rem]">
								<ul className={styles.card_content}>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>FRN</p>
										<p className={styles.content}>{item.info.frn}</p>
									</li>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>Applicant</p>
										<p className={styles.content}>{item.info.applicant}</p>
									</li>
									<li className={`${styles.item} w-72`}>
										<p className={styles.label}>Service Provider</p>
										<p className={styles.content}>{item.info.service_provider}</p>
									</li>
									<li className='p-2 rounded-md bg-slate-100 dark:text-white dark:bg-slate-900'>{item.info.narrative}</li>
								</ul>
								<Table key={index} head={head} body={item.data.not_received} search={false} filter={false} sort={false} assignees={false} timestamp={false} />
							</Card>
						)
					})}
				</>
				: 
				<div className='w-full h-64'>
					<Spinner />
				</div>
				}
			</div>
		</div>
	)
}

export default ApplicantView