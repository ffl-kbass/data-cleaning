import Skeleton from "../../Spinner/Skeleton"
import styles from "./Metrics.module.css"

const Metrics = ({data, loading}) => {
    return (
        <>
            <h2 className={styles.title}>District Metrics</h2>
            <ul className={styles.container}>
                <li className={styles.item}>
                    <p className={styles.label}>District Name</p>
                    {!loading ? <p className={styles.content} title={data.district.items.entity_name}>{data.district.items.entity_name}</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Entity Number</p>
                    {!loading ? <p className={styles.content} >{data.district.items.entity_number}</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>State Code</p>
                    {!loading ? <p className={styles.content} >{data.district.items.state_code}</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Child Entities/Schools</p>
                    {!loading ?                     
                    <p className={styles.content} title={data.district.items.child_entity_numbers}>
                        {data.district.items.child_entity_numbers && JSON.parse(`[${data.district.items.child_entity_numbers}]`).length}
                    </p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Num Students</p>
                    {!loading ? <p className={styles.content} >{data.district.items.num_students}</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Total BW</p>
                    {!loading ? <p className={styles.content} >{data.district.items.total_bandwidth_mbps} Mbps</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>BW/Student</p>
                    {!loading ? <p className={styles.content} >{data.district.items.bandwidth_per_student_mbps} Mbps</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Adjusted BW/Student</p>
                    {!loading ? <p className={styles.content} >{data.district.items.adj_bandwidth_per_student_mbps} Mbps</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Cost/Mbps</p>
                    {!loading ? <p className={styles.content} >${Number(data.district.items.cost_per_mbps).toFixed(2)}</p> : <Skeleton />}
                </li>
                <li className={styles.item}>
                    <p className={styles.label}>Included in Connect K-12</p>
                    {!loading ? <p className={styles.content} >{data.district.items.in_universe == 1 ? 'True' : 'False'}</p> : <Skeleton />}
                </li>
            </ul>
        </>
    )
}

export default Metrics