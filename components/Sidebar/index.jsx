import styles from "./Sidebar.module.css"
import Link from "next/link"
import Timestamp from "./Timestamp"

const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>
				<h1 className="font-bold text-3xl">
					Data Cleaning
				</h1>
			</div>
			<div className={styles.countdown}>
				<p className={styles.title}>50 Days Left</p>
				<p className={styles.sub}>January 30th 2022</p>
			</div>
			<ul>
				<li className={styles.item}>
					<Link href="/">
						<a className="flex flex-row flex-nowrap gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>	
							States
						</a>
					</Link>
				</li>
				<li className={styles.item}>
					<Link href="/Applicants/All">
						<a className="flex flex-row flex-nowrap gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path d="M12 14l9-5-9-5-9 5 9 5z" />
								<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
							</svg>
							Applicants
						</a>
					</Link>
				</li>
				<li className={styles.item}>
					<Link href="/Statistics">
						<a className="flex flex-row flex-nowrap gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
							</svg>
							Stats
						</a>
					</Link>
				</li>
			</ul>
			<Timestamp>
				06/21/2022 12:00 PM
			</Timestamp>
		</aside>
	)
}

export default Sidebar