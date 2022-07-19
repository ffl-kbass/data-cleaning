const DQI_QUERY = `
query(
	$funding_year: Int,
	$entity_number: Int!,
) {
  dqis (
		funding_year: $funding_year,
		entity_number: $entity_number,
	) {
		items {
			funding_year
			issue_name
			open
			manual
			reason
			user_id
			id
			readable
			hover
		}
	}
}`

export default DQI_QUERY