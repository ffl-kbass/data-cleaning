import Dropdown from "../../Dropdown"
import styles from "./State.module.css"

const Filter = ({setTableFilter, tableFilter}) => {
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
                <div className={`${styles.container} flex flex-row gap-4`}>
                    <div className="flex flex-col">
                        <p className={styles.label}>Applicant Type</p>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="districts" onChange={(e) => setTableFilter("applicant_type",e)} checked={tableFilter.applicant_type.districts}/>
                            Districts
                        </label>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div className={`${styles.container} flex flex-col`}>
                        <p className={styles.label}>District Issues</p>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="missing_allocation" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.missing_allocation}/>
                            Missing Allocation
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="abnormal_allocations_source" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.abnormal_allocations_source}/>
                            Abnormal Allocations Source
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="dirty_services" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.dirty_services}/>
                            Dirt Services
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="missing_bandwidth_transport" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.missing_bandwidth_transport}/>
                            Missing Bandwidth/Transport
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="missing_bandwidth" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.missing_bandwidth}/>
                            Missing Bandwidth
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="extra_internet" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.extra_internet}/>
                            Extra Internet
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="missing_internet_transport" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.missing_internet_transport}/>
                            Missing Internet Transport
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="veto" onChange={(e) => setTableFilter("district_issues",e)} checked={tableFilter.district_issues.veto}/>
                            Veto
                        </label>
                    </div>
                    <div className={`${styles.container} flex flex-col`}>
                        <p className={styles.label}>Outlier Issues</p>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="change_in_bandwidth" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.change_in_bandwidth}/>
                            Change In Bandwidth
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="change_in_cost_mbps" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.change_in_cost_mbps}/>
                            Change In Cost/Mbps
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="cost_mbps" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.cost_mbps}/>
                            Cost/Mbps
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="bandwidth_student" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.bandwidth_student}/>
                            Bandwidth/Student
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="change_num_students" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.change_num_students}/>
                            change_num_students
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="not_meeting_connectivity_rule" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.not_meeting_connectivity_rule}/>
                            not_meeting_connectivity_rule
                        </label>
                        <label className={styles.input_container}>
                            <input type="checkbox" value="increase_cost_per_mbps_rule" onChange={(e) => setTableFilter("outlier_issues",e)} checked={tableFilter.outlier_issues.increase_cost_per_mbps_rule}/>
                            increase_cost_per_mbps_rule
                        </label>
                    </div>
                </div>
            </div>
        </Dropdown>
    )
}

export default Filter