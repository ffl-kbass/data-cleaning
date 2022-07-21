import { useContext } from "react";
import Dropdown from "../../Dropdown"
import styles from "./State.module.css"
import { FilterContext } from '../../../Context/context';

const Filter = () => {
    const { filter, dispatchFilterEvent } = useContext(FilterContext);
    return (
        <Dropdown title={
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
            </>
        }>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className={`${styles.container} flex flex-col`}>
                        <p className={styles.label}>District Issues</p>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="allocations_missing" onChange={(e) => dispatchFilterEvent(e)} checked={filter.allocations_missing}/>
                            Missing Allocation
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="allocations_source" onChange={(e) => dispatchFilterEvent(e)} checked={filter.allocations_source}/>
                            Abnormal Allocations Source
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="dirty_services" onChange={(e) => dispatchFilterEvent(e)} checked={filter.dirty_services}/>
                            Dirty Services
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="districts_missing_ia" onChange={(e) => dispatchFilterEvent(e)} checked={filter.districts_missing_ia}/>
                            Missing Bandwidth/Transport
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="isp_missing" onChange={(e) => dispatchFilterEvent(e)} checked={filter.isp_missing}/>
                            Missing Bandwidth
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="surplus_ia" onChange={(e) => dispatchFilterEvent(e)} checked={filter.surplus_ia}/>
                            Extra Internet
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="upstream_missing" onChange={(e) => dispatchFilterEvent(e)} checked={filter.upstream_missing}/>
                            Missing Internet Transport
                        </label>
                    </div>
                    <div className={`${styles.container} flex flex-col`}>
                        <p className={styles.label}>Outlier Issues</p>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_change_in_bw" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_change_in_bw}/>
                            Outlier: Change in Bandwidth
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_change_in_cost_per_mbps" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_change_in_cost_per_mbps}/>
                            Outlier: Change in Cost/Mbps
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_ia_bandwidth_per_student" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_ia_bandwidth_per_student}/>
                            Outlier: Bandwidth/Student
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_ia_monthly_cost_per_mbps" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_ia_monthly_cost_per_mbps}/>
                            Outlier: Cost/Mbps
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_change_num_students" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_change_num_students}/>
                            outlier_change_num_students
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_increase_cost_per_mbps_rule" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_increase_cost_per_mbps_rule}/>
                            outlier_increase_cost_per_mbps_rule
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="outlier_not_meeting_connectivity_rule" onChange={(e) => dispatchFilterEvent(e)} checked={filter.outlier_not_meeting_connectivity_rule}/>
                            outlier_not_meeting_connectivity_rule
                        </label>
                    </div>
                </div>
            </div>
        </Dropdown>
    )
}

export default Filter