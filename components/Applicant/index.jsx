import { useRouter } from 'next/router'
import Card from '../Card'
import Indicator from '../Card/Indicator'
import Table from '../Table'
import card from '../Card/Card.module.css'
import { useEffect, useRef, useState } from 'react'
import Dropdown from '../Dropdown'
import styles from "./Applicant.module.css"

const ApplicantView = ({ year, scroll, scrollPos, scrollSync, checked = null, primary = false }) =>
{
	const head = [null, 'Line Item', 'Purpose', 'Download Speed (Mbps)', 'Shared', 'Quantity', 'Lines Allocated', 'Monthly Elig Recurring', 'Total Elig Non-Recurring', 'Months of Service', 'Contract End Date', 'Service DQIs']
	const body = [
		{
			data: [ 
				{
					type: 'input',
					props: {
						value: "1",
						type: "checkbox",
						onChange: (e) => checked(e)
					}
				},
				'test',
				'test', 
				'test', 
				'test', 
				'test', 
				'test', 
				'test', 
				'test', 
				'test', 
				'test', 
				'test'
			]
		}
	]

	const app = useRef(null)
	const router = useRouter()
	const [currentYear,setYear] = useState(year)
	const [editClosed, setEditClosed] = useState(true)
	const [editOpen, setEditOpen] = useState(true)

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
				{/* <p className='text-xs'>Funding Year</p> */}
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
						<h2 className={card.title}>District Metrics</h2>
						<ul className='flex flex-col gap-2 text-sm'>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>District Name</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Entity Number</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Other District BENs</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>State Code</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Child Entities/Schools</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Num Students</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Total BW</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>BW/Student</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Adjusted BW/Student</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Cost/Mbps</p>
								<p>test</p>
							</li>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Included in Connect K-12</p>
								<p>test</p>
							</li>
						</ul>
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
				<div className='w-full px-4'>
					<h3 className='text-xl font-bold'>Services Received</h3>
					<p className='text-sm'>Total Service: </p>
				</div>
				<Card className="min-w-[16rem]">
					<ul className='text-sm'>
						<li>No FRN (Not E-rate Service)</li>
						<li>Applicant:</li>
						<li>Provider:</li>
						<li>Narrative:</li>
					</ul>
					<Table head={head} body={body} search={false} filter={false} sort={false} assignees={false} timestamp={false} />
				</Card>
			</div>
		</div>
	)
}

export default ApplicantView