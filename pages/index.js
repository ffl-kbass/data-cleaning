import Table from "../components/Table"
import Title from "../components/Title"
import Assignees from "../components/Assignees"
import Link from 'next/link'
import Stats from "../components/Stats"
import Badge from "../components/Badge"

const States = () => {
	const head = ['State', 'Clean Percentage', 'Assignees']
	const body = [
		{
			type: 'success',
      		filter: "Oklahoma",
			data: [
			{
				type: Link,
				props: {
					href: "/Applicants/Oklahoma"
				},
				content: 'Oklahoma'
			}, 
			{
				type: Badge,
				props: {
					type: 'success',
					size: 'large'
				},
				content: '90%'
			}, 
			{
				type: Assignees,
				props: {
					names: [{
						first: "Kenny",
						last: "Bass"
					}]
				}
			}]
		}, {
			type: 'warning',
			timestamp: '06/20/2022 12:00 PM',
      		filter: "Texas",
			data: [
			{
				type: Link,
				props: {
					href: "/Applicants/Texas"
				},
				content: 'Texas'
			}, 
			{
				type: Badge,
				props: {
					type: 'warning',
					size: 'large'
				},
				content: '50%'
			},
			{
				type: Assignees,
				props: {
					names: [{
						first: "Kenny",
						last: "Bass"
					},{
						first: "Kenny",
						last: "Bass"
					},{
						first: "Kenny",
						last: "Bass"
					}]
				}
			}]
		}, {
			type: 'emergency',
      		filter: "Alaska",
			data: [
			{
				type: Link,
				props: {
					href: "/Applicants/Alaska"
				},
				content: 'Alaska'
			}, 
			{
				type: Badge,
				props: {
					type: 'emergency',
					size: 'large'
				},
				content: '10%'
			}, 
			{
				type: Assignees,
				props: {
					names: [{
						first: "Kenny",
						last: "Bass"
					},{
						first: "Kenny",
						last: "Bass"
					}]
				}
			}]
		}
	]

	return (
		<div className="pl-16">
			<Title>States</Title>
			<div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="grid grid-rows-2 gap-2 h-full">
					<Stats title="Overall Cleanliness">
						<div className="w-full flex flex-row flex-nowrap items-center gap-2">
							<div className="flex-grow h-2 rounded-full bg-green-500"/>
							<p className="text-base">100%</p>
						</div>
					</Stats>
					<Stats title="Overall Cleanliness">
						<div className="w-full flex flex-row flex-nowrap items-center gap-2">
							<div className="flex-grow h-2 rounded-full bg-green-500"/>
							<p className="text-base">100%</p>
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
						<li className="flex items-center gap-2">
							<Badge type="emergency">
								48
							</Badge>
							Oklahoma
						</li>
						<li className="flex items-center gap-2">
							<Badge type="emergency">
								49
							</Badge>
							Texas
						</li>
						<li className="flex items-center gap-2">
							<Badge type="emergency">
								50
							</Badge>
							Alaska
						</li>
					</ol>
				</Stats>
			</div>
			<Table head={head} body={body} />
		</div>
	)
}

export default States