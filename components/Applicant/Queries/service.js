const servicesQuery = `
query(
	$funding_year: Int,
	$entity_number: Int!,
) {
  services (
		funding_year: $funding_year,
		entity_number: $entity_number,
	) {
		items {
			received {
				frn {
					frn
					line_item
					purpose
					download_speed_mbps
					shared
					num_lines
					district_num_lines
					monthly_recurring_eligible_costs
					total_non_recurring_eligible_costs
					months_of_service
					contract_expiration_date
					fcstatus
					service_id
					applicant_ben
					narrative
					service_provider_name
				}
			}
			not_received {
				frn {
					frn
					line_item
					purpose
					download_speed_mbps
					shared
					num_lines
					district_num_lines
					monthly_recurring_eligible_costs
					total_non_recurring_eligible_costs
					months_of_service
					contract_expiration_date
					fcstatus
					service_id
					applicant_ben
					narrative
					service_provider_name
				}
			}
		}
	}
}`

export default servicesQuery