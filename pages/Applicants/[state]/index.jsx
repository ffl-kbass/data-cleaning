import Table from "../../../components/Table"
import Title from "../../../components/Title"
import Stats from "../../../components/Stats"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Assignees from "../../../components/Assignees"

const Applicants = () =>
{
	const router = useRouter()

	const head = ['Name', 'Entity Number', 'State']
	const body = [
		{
			timestamp: '06/21/2022 12:00 PM',
			data: [
				{
					type: Link,
					props: {
						href: `${ router.query.state }/123456`
					},
					content: "Arvon Township School District"
				}, 
				'131791', 
				'Michigan'
			]
		}
	]

	return (
		<div className="pl-16">
			<Title>{router.query.state}</Title>
			<div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="grid grid-rows-2 gap-2 h-full">
					<Stats title="Assigned">
						<div className="flex flex-row flex-nowrap items-center gap-2">
							<Assignees names={[{
								first: "Kenny",
								last: "Bass"
							}]} />
							<h4>Kenny Bass</h4>
						</div>
					</Stats>
					<Stats title="Recent Cleaner">
						<div className="flex flex-row flex-nowrap items-center gap-2">
							<Assignees names={[{
								first: "Kenny",
								last: "Bass"
							}]} />
							<h4>Kenny Bass</h4>
						</div>
					</Stats>
				</div>
				<Stats title="Cleanliness">
					<div className="w-full h-full flex items-center justify-center">
						<div className="h-20 w-full rounded-full border-8 border-green-500 flex items-center justify-center flex-col">
							<p className="font-bold text-xl">100%</p>
							<p className="text-xs">Clean</p>
						</div>
					</div>
				</Stats>
				<Stats title="Issues">
					<div className="flex-1 flex flex-col gap-2 h-full">
						<p className="font-bold text-lg flex-1 flex items-center px-4 rounded-md bg-red-500 text-white">200 DQIs Remaining</p>
						<p className="font-bold text-lg flex-1 flex items-center px-4 rounded-md bg-red-500 text-white">200 Outliers Remaining</p>
					</div>
				</Stats>
			</div>
			<Table head={head} body={body} assignees={false} />
		</div>
	)
}

export default Applicants