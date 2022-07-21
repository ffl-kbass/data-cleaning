import { useState } from 'react'
import styles from '../Metrics/Metrics.module.css'
import Button from '../../Button'
import Indicator from '../../Card/Indicator'
import Skeleton from '../../Spinner/Skeleton'

const DQI = ({data,loading}) => {
	const [editClosed, setEditClosed] = useState(false)
	const [editOpen, setEditOpen] = useState(false)

    return (
    <>
        <h2 className={styles.title}>Data Quality Indicators</h2>
            <ul className='text-sm'>
                <li className={styles.sub_title}>
                    <p className='font-bold'>Open Issues Found:</p>
                    <Button as='button' type={['ghost','square']} onClick={() => setEditOpen(!editOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </Button>
                </li>
                {!loading ? <>
                    {data.open.length > 0 ? data.open.map((item, index) => {
                        return (
                            <li key={index}>
                                <Indicator tooltip={item.hover} cleared={item.open} edit={editOpen}>
                                    {item.readable}
                                </Indicator>
                            </li>
                        )
                    }) :
                    <div className='p-2 rounded-md text-xs bg-slate-100 dark:text-white dark:bg-slate-900'>
                        No Open Issues
                    </div>
                    }
                </> : <Skeleton />}
            </ul>
            <ul className='text-sm'>
                <li className={styles.sub_title}>
                    <p className='font-bold'>Resolved Issues:</p>
                    <Button as='button' type={['ghost','square']} onClick={() => setEditClosed(!editClosed)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </Button>
                </li>
                {!loading ? <>
                    {data.closed.length > 0 ? data.closed.map((item, index) => {
                        return (
                            <li key={index}>
                                <Indicator tooltip={item.hover} cleared={item.open} edit={editClosed}>
                                    {item.readable}
                                </Indicator>
                            </li>
                        )
                    }) :
                    <div className='p-2 rounded-md text-xs bg-slate-100 dark:text-white dark:bg-slate-900'>
                        No Open Issues
                    </div>
                    }
                </> : <Skeleton />}
            </ul>
        </>
    )
}

export default DQI