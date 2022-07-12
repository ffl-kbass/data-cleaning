import Dropdown from "../Dropdown"
import styles from "./Table.module.css"
import drop from "../Dropdown/Dropdown.module.css"
import Assignees from "../../components/Assignees"
import Badge from "../../components/Badge"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'

const Table = ({head, body, search = true, sort = true, filter = true, assignees = true, timestamp = true}) => {
	const primary = useRef(null)
	const secondary = useRef(null)

	const [mainSearch, setMainSearch] = useState("")
	const [filterSearch, setFilterSearch] = useState("")
	const [tableFilter, setTableFilter] = useState([])

	useEffect(() => {
		if(timestamp){
			primary.current.addEventListener('scroll', (element) => {
				secondary.current.style.top = -element.target.scrollTop + "px"
			})

			return (
				primary.current.removeEventListener('scroll', (element) => {
					secondary.current.style.top = -element.target.scrollTop + "px"
				})
			)
		}
	},[])

	const handleCheckboxChange = (event) =>
	{
		if (event.target.checked)
		{
			if (!tableFilter.includes(event.target.value))
			{
				setTableFilter(prev => [...prev, event.target.value])
			}
		} else
		{
			setTableFilter(tableFilter.filter(element => element != event.target.value));
		}
	}
	
	return (
		<>
			<div className={styles.modifiers}>
				{search && <div className={styles.input}>
					<div className={styles.search}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<input type="text" placeholder="Search..." value={mainSearch} onChange={(e) => setMainSearch(e.target.value)}/>
				</div>}
				<div className={styles.buttons}>
				{sort &&
					<Dropdown title={
						<>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
							</svg>
							Sort
						</>
					}>
						<button className={drop.element}>
							<Badge shape="round">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
								</svg>
							</Badge>
							Districts Clean %
						</button>
						<button className={drop.element}>
							<Badge shape="round">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
								</svg>
							</Badge>
							Districts Clean %
						</button>
						<button className={drop.element}>
							<Badge shape="round">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
								</svg>
							</Badge>
							State Name
						</button>
						<button className={drop.element}>
							<Badge shape="round">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
								</svg>
							</Badge>
							State Name
						</button>
					</Dropdown>}
				{filter &&
					<Dropdown title={
						<>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
							Filter
						</>
					}>
						<div className="flex flex-col gap-8 p-2">
							<div className="flex flex-row gap-6">
								<div className="flex flex-col gap-2">
									<div>
										<p className="font-bold text-slate-500 text-xs truncate pb-1 pl-1 dark:text-slate-50">Applicant BEN/Name</p>
										<input className="py-1 px-2 rounded-md border border-slate-200 bg-slate-50 truncate dark:bg-slate-900 dark:border-slate-700" />
									</div>
									<div>
										<p className="font-bold text-slate-500 text-xs truncate pb-1 pl-1 dark:text-slate-50">State</p>
										<input className="py-1 px-2 rounded-md border border-slate-200 bg-slate-50 truncate dark:bg-slate-900 dark:border-slate-700" />
									</div>
									<div>
										<p className="font-bold text-slate-500 text-xs truncate pb-1 pl-1 dark:text-slate-50">Applicant Address</p>
										<input className="py-1 px-2 rounded-md border border-slate-200 bg-slate-50 truncate dark:bg-slate-900 dark:border-slate-700" />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<div className="flex flex-col">
										<p className="font-bold text-slate-500 text-xs truncate pb-1 pl-1 dark:text-slate-50">Applicant Type</p>
										<label className="inline-flex gap-2">
											<input type="radio" />
											Districts
										</label>
										<label className="inline-flex gap-2">
											<input type="radio" />
											Other
										</label>
									</div>
									<div className="flex flex-col">
										<p className="font-bold text-slate-500 text-xs truncate pb-1 pl-1 dark:text-slate-50">Applicant Type</p>
										<label className="inline-flex gap-2">
											<input type="radio" />
											No DQI Filter
										</label>
										<label className="inline-flex gap-2">
											<input type="radio" />
											Filter Open DQIs
										</label>
									</div>
								</div>
							</div>
							<div className="flex flex-row flex-wrap gap-4">
								<div className="flex flex-col gap-2">
									<label className="inline-flex gap-2 font-bold">
										<input type="checkbox" />
										District Issues
									</label>
									<div className="flex flex-col gap-1 pl-4 text-sm">
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Missing Allocation
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Abnormal Allocations Source
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Dirt Services
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Missing Bandwidth/Transport
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Missing Bandwidth
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Extra Internet
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Missing Internet Transport
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Veto
										</label>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<label className="inline-flex gap-2 font-bold">
										<input type="checkbox" />
										Outlier Issues
									</label>
									<div className="flex flex-col gap-1 pl-4 text-sm">
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Change In Bandwidth
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Change In Cost/Mbps
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Cost/Mbps
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											Bandwidth/Student
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											change_num_students
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											not_meeting_connectivity_rule
										</label>
										<label className="inline-flex gap-2">
											<input type="checkbox" />
											increase_cost_per_mbps_rule
										</label>
									</div>
								</div>
							</div>
						</div>
					</Dropdown>}
				{assignees &&
					<Dropdown title={
						<>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							Assignees
						</>
					}>
						<div className={`${styles.input}`}>
							<div className={styles.search}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
							<input type="text" placeholder="Search..." />
						</div>
						<div  className="p-1"/>
						<label className={drop.element}>
							<input type="checkbox" className="hidden" />
							<Assignees names={[{first: "Kenny",last: "Bass"}]}/>
							Kenny Bass
						</label>
					</Dropdown>}
				</div>
			</div>
			<div className="flex flex-row-reverse h-full w-full max-w-7xl max-h-[30rem]">
				<div className={styles.container}>
					<div className={styles.sub} ref={primary}>
						<table>
							<thead>
								<tr>
									{head.map((element, index) => {
										return <th key={index}>{element}</th>	
									})}
								</tr>
							</thead>
							<tbody>
								{body.filter((row) =>
									!mainSearch.length || 
									row.filter
									.toString().toLowerCase()
									.includes(mainSearch.toString().toLowerCase())
								
								).filter((row) => 
									!tableFilter.length ||
									tableFilter.includes(row.filter.toString().toLowerCase())
								).map((element, index) =>
								{
									return (
										<tr key={index} className={styles[element.type]}>
											{element.data.map((item, index) => {
												if(typeof item == 'object' && !React.isValidElement(item)) {
													if(!item.type) return
													const Tag = item.type													
													return (
														<td key={index}>
															<Tag {...item.props}>{item.content && item.content}</Tag>
														</td>
													)
												}
												return <td key={index}>{item}</td>
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				{timestamp && <div className={styles.timestamp_container}>
					{/* <div className="pointer-events-none z-40 h-4 w-full absolute top-0 bg-gradient-to-b from-white to-transparent"></div> */}
					<ul className="h-full w-full overflow-hidden relative" ref={secondary}>
						{body.filter((row) =>
							!mainSearch.length ||
							row.filter
								.toString().toLowerCase()
								.includes(mainSearch.toString().toLowerCase())

						).filter((row) =>
							!tableFilter.length ||
							tableFilter.includes(row.filter.toString().toLowerCase())
						).map((element, index) =>
						{
							return (
								<li key={index} className={styles.timestamp} title={element.timestamp}>
									{element.timestamp && <>
										<div className={styles.marker}/>
										<span>
											<p className={styles.title}>Viewed:</p>
											<p className={styles.text}>{element.timestamp}</p>
										</span>
									</>}
								</li>
							)
						})}
					</ul>
					{/* <div className="pointer-events-none z-40 h-4 w-full absolute bottom-0 bg-gradient-to-t from-white to-transparent"></div> */}
				</div>}
			</div>
		</>
	)
}

export default Table