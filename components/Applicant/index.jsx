import { useRouter } from 'next/router'
import Card from '../Card'
import Indicator from '../Card/Indicator'
import Table from '../Table'
import card from '../Card/Card.module.css'
import { useEffect, useRef, useState } from 'react'
import Dropdown from '../Dropdown'

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
		<div ref={app} className={`w-full h-full flex-1 overflow-x-hidden overflow-y-auto p-4 rounded-lg ${primary && 'bg-slate-50 border-2 border-blue-500'}`}>
			<div className='inline-flex flex-row items-center gap-1 mb-6'>
				{/* <p className='text-xs'>Funding Year</p> */}
				{!primary ?
				<Dropdown title={
					<>
						<h4 className='text-xl font-bold text-left inline-flex flex-row gap-2 items-center justify-center text-slate-900'>
							{currentYear}
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</h4>
					</>
				}>
					{getYears().map((year, index) => {
						return <button onClick={() => setYear(year)} className='p-2 rounded-lg' key={index}>{year}</button>
					})}
				</Dropdown>
				: <h4 className='text-3xl font-bold text-blue-500'>{year}</h4>
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
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Open Issues Found:</p>
							</li>
							<li><Indicator cleared={false}>Outlier: Bandwidth/Student</Indicator></li>
						</ul>
						<ul className='text-sm'>
							<li className='flex flex-row justify-between'>
								<p className='font-bold'>Resolved Issues:</p>
							</li>
							<li><Indicator cleared={true}>Missing Internet Transport</Indicator></li>
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