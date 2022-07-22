import Table from "../../../components/Table";
import Title from "../../../components/Title";
import Stats from "../../../components/Stats";
import Assignees from "../../../components/Assignees";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../../Context/context";

const DISTRICTS_QUERY = `
query(
	$funding_year: Int,
	$state_code: String!,
	$issues: String,
) {
  districts (
		funding_year: $funding_year,
		state_code: $state_code,
		issues: $issues,
	) {
		items {
			funding_year
			state_code
			entity_name
			entity_number
		}
	}
}
`;

const Applicants = () => {
  const { filter, dispatchFilterEvent } = useContext(FilterContext);
  const [body, setBody] = useState([]);
  const [issues, setIssues] = useState("");
  const router = useRouter();

  const [result] = useQuery({
    query: DISTRICTS_QUERY,
    variables: {
      funding_year: new Date().getFullYear(),
      state_code: router.query.state,
      issues: issues,
    },
  });

  const { data, fetching, error } = result;

  const head = ["Name", "Entity Number", "State"];

  useEffect(() => {
    if (fetching == true) return;
    let temp = [];

    const { items } = data.districts;

    items.forEach((item) => {
      temp.push({
        filter: item.entity_name,
        data: [
          {
            type: "a",
            props: {
              href: `${item.state_code}/${item.entity_number}`,
              target: "_blank",
            },
            content: item.entity_name,
          },
          item.entity_number,
          item.state_code,
        ],
      });
    });
    setBody(temp);
  }, [data]);

  useEffect(() => {
    if (!filter) return;

    const temp = [];
    for (const key in filter) {
      if (filter[key]) {
        temp.push(key);
      }
    }

    let string = JSON.stringify(temp);
    let format = string.substring(1, string.length - 1).replace(/"/g, "'");

    setIssues(format);
  }, [filter]);

  return (
    <div className="pl-16">
      <Title>{router.query.state}</Title>
      <div className="mb-8 grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="grid h-full grid-rows-2 gap-2">
          <Stats title="Assigned">
            <div className="flex flex-row flex-nowrap items-center gap-2">
              <Assignees
                names={[
                  {
                    first: "Kenny",
                    last: "Bass",
                  },
                ]}
              />
              <h4>Kenny Bass</h4>
            </div>
          </Stats>
          <Stats title="Recent Cleaner">
            <div className="flex flex-row flex-nowrap items-center gap-2">
              <Assignees
                names={[
                  {
                    first: "Kenny",
                    last: "Bass",
                  },
                ]}
              />
              <h4>Kenny Bass</h4>
            </div>
          </Stats>
        </div>
        <Stats title="Cleanliness">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-full flex-col items-center justify-center rounded-full border-8 border-green-500">
              <p className="text-xl font-bold">100%</p>
              <p className="text-xs">Clean</p>
            </div>
          </div>
        </Stats>
        <Stats title="Issues">
          <div className="flex h-full flex-1 flex-col gap-2">
            <p className="flex flex-1 items-center rounded-md bg-red-500 px-4 text-lg font-bold text-white">
              200 DQIs Remaining
            </p>
            <p className="flex flex-1 items-center rounded-md bg-red-500 px-4 text-lg font-bold text-white">
              200 Outliers Remaining
            </p>
          </div>
        </Stats>
      </div>
      <Table loading={fetching} head={head} body={body} assignees={false} />
    </div>
  );
};

export default Applicants;
