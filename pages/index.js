import Table from "../components/Table"
import Title from "../components/Title"
import Assignees from "../components/Assignees"
import Stats from "../components/Stats"
import Badge from "../components/Badge"
import Link from 'next/link'
import { useQuery } from 'urql';
import { useEffect, useState } from "react"

const STATE_QUERY = `
query(
	$funding_year: Int,
	$sort_by: String,
	$sort_direction: String,
) {
  states (
		funding_year: $funding_year,
		sort_by: $sort_by,
		sort_direction: $sort_direction,
	) {
		national {
			percent_districts_clean
			percent_meeting_goal
		}
		items {
			type
			filter
			data {
				state_code
				funding_year
				clean_districts
				all_districts
				percent_districts_clean
				percent_meeting_goal
				time
			}
		}
		sort {
				state_code
				clean_districts
				all_districts
				percent_districts_clean
				percent_meeting_goal
		}
	}
}
`;

const States = () => {
	const [body, setBody] = useState([])
	const [direction, setDirection] = useState('ASC')
	const [column, setColumn] = useState('state_code')
	const [sort, setSort] = useState([])
	const [needs_attention, setNeeds_attention] = useState([])

	const [result] = useQuery({
		query: STATE_QUERY,
		variables: {
			funding_year: 2021,
			sort_by: column,
			sort_direction: direction
		}
	})

	const { data, fetching, error } = result;

	useEffect(() => {
		if(fetching == true || error) return
		let temp = []

		const { items } = data.states

		items.forEach(item => {
			temp.push({
				type: item.type,
				filter: item.filter,
				timestamp: item.data.time,
				data: [
					{
						type: Link,
						props: {
							href: `/Applicants/${item.data.state_code}`
						},
						content: item.data.state_code
					}, 
					item.data.clean_districts,
					item.data.all_districts,
					{
						type: Badge,
						props: {
							type: item.type,
							size: 'large'
						},
						content: (item.data.percent_districts_clean).toFixed(2) + "%"
					}, 
					(item.data.percent_meeting_goal).toFixed(2) + "%",
					{
						type: Assignees,
						props: {
							names: [{
								first: "Kenny",
								last: "Bass"
							}]
						}
					}
				]
			})
		});
		setBody(temp)

		temp = []

		Object.keys(data.states.sort).forEach(item => {
			temp.push(
				{
					key: data.states.sort[item],
					desc: () => setSorting('DESC', item),
					asc: () => setDirection('ASC', item),
				}
			)
		})
		temp.pop()
		setSort(temp)

		temp = items.sort((a, b) => a.data.percent_districts_clean - b.data.percent_districts_clean).slice(0,3)
		setNeeds_attention(temp)
	},[data])

	const setSorting = (dir, col) => {
		setDirection(dir)
		setColumn(col)
	}


	const head = ['State', 'Clean Districts', 'All Districts', 'Clean Percentage', 'Districts Meeting Goal', 'Assignees']

	return (
		<div className="pl-16">
			<Title>States</Title>
			<div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="grid grid-rows-2 gap-2 h-full">
					<Stats title="Overall Cleanliness">
						<div className="w-full flex flex-row flex-nowrap items-center gap-2">
							<div className="flex-grow h-2 bg-slate-300 rounded-full">
								<div style={{width: (data ? Number(data.states.national.percent_districts_clean).toFixed(2) : 0) + '%'}} className="h-full rounded-full bg-green-500"/>
							</div>
							<p className="text-base">{data && Number(data.states.national.percent_districts_clean).toFixed(2)}%</p>
						</div>
					</Stats>
					<Stats title="Meeting Goal">
						<div className="w-full flex flex-row flex-nowrap items-center gap-2">
							<div className="flex-grow h-2 bg-slate-300 rounded-full">
								<div style={{width: (data ? Number(data.states.national.percent_meeting_goal).toFixed(2) : 0) + '%'}} className="h-full rounded-full bg-green-500"/>
							</div>
							<p className="text-base">{data && Number(data.states.national.percent_meeting_goal).toFixed(2)}%</p>
						</div>
					</Stats>
				</div>
				<Stats title="Top Cleaners">
					<ol className="h-full w-full px-4 py-2 space-y-2">
						<li className="flex items-center gap-2">
							<Badge type="success">
								1
							</Badge>
							Kenny Bass
						</li>
						<li className="flex items-center gap-2">
							<Badge type="success">
								2
							</Badge>
							Kenny Bass
						</li>
						<li className="flex items-center gap-2">
							<Badge type="success">
								3
							</Badge>
							Kenny Bass
						</li>
					</ol>
				</Stats>
				<Stats title="Needs Attention">
					<ol className="h-full w-full px-4 py-2 space-y-2">
						{needs_attention.map((item,index) => {
							return (
								<li key={index} className="flex items-center gap-2">
									<Badge type={item.type}>
										{(item.data.percent_districts_clean).toFixed(2) + "%"}
									</Badge>
								<Link href={`/Applicants/${item.filter}`}>{item.filter}</Link>
							</li>
							)
						})}
					</ol>
				</Stats>
			</div>
			<Table sort={sort} loading={fetching} head={head} body={body} filter={false}/>
		</div>
	)
}

export default States