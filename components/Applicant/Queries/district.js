const districtQuery = `
query(
	$funding_year: Int,
	$entity_number: Int!,
) {
district (
		funding_year: $funding_year,
		entity_number: $entity_number,
	) {
		items {
			funding_year
			state_code
			entity_name
			entity_number
			num_students
			child_entity_numbers
			total_bandwidth_mbps
			bandwidth_per_student_mbps
			adj_bandwidth_per_student_mbps
			cost_per_mbps
			in_universe
		}
	}
}`

export default districtQuery