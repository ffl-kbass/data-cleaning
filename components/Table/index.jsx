import Dropdown from "../Dropdown"
import styles from "./Table.module.css"
import drop from "../Dropdown/Dropdown.module.css"
import Assignees from "../../components/Assignees"
import Badge from "../../components/Badge"
import Spinner from "../../components/Spinner"
import Filter from "../Filter/State"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'
import Button from "../Button"

const Table = ({head, body, search = true, sort = [], filter = true, assignees = true, timestamp = true, loading = false}) => {
	const primary = useRef(null)
	const secondary = useRef(null)

	const [mainSearch, setMainSearch] = useState("")
	const [filterSearch, setFilterSearch] = useState("")
	const [tableFilter, setTableFilter] = useState({
		applicant_type: {
			districts: false,
		},
		filter_dqis: {
			no_dqi_filter: false,
		},
		district_issues: {
			missing_allocation: false,
			district_issues: false,
			missing_allocation: false,
			abnormal_allocations_source: false,
			dirty_services: false,
			missing_bandwidth_transport: false,
			missing_bandwidth: false,
			extra_internet: false,
			missing_internet_transport: false,
			veto: false,
		},
		outlier_issues: {
			outlier_issues: false,
			change_in_bandwidth: false,
			change_in_cost_mbps: false,
			cost_mbps: false,
			bandwidth_student: false,
			change_num_students: false,
			not_meeting_connectivity_rule: false,
			increase_cost_per_mbps_rule: false
		}
	})

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

	const onChange = (section,e) => {
		const items = {...tableFilter};
		items[section][e.target.value] = e.target.checked;

		setTableFilter(items);
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
				{sort.length > 0 &&
					<Dropdown title={
						<>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
							</svg>
							Sort
						</>
					}>
						{
							sort.map((item, index) => {
								return (
									<div className="flex flex-row flex-nowrap items-center gap-2">
										<p className="font-semibold text-sm text-slate-600 flex-1 dark:text-slate-50">{item.key}</p>
										<Button onClick={item.asc}>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
											</svg>
										</Button>
										<Button onClick={item.desc}>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
											</svg>
										</Button>
									</div>
								)
							})
						}
					</Dropdown>}
				{filter &&
					<Filter setTableFilter={onChange} tableFilter={tableFilter} />}
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
						{!loading ? <table>
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
						</table> : 
						<div className="w-full h-64 flex items-center justify-center">
							<Spinner />
						</div>}
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